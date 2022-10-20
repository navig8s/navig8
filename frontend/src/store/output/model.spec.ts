import { generateCommandLines, extractDiffFromForm, NEW_LINE } from './model'
import { Fields, Text, Number, Switcher, Pairs, List, Select } from '@/store/form/model'
import { clone, fromPairs } from 'ramda'
import { ValuesFile } from '@/model/Repo'

const generateCommands = (
  form: Fields,
  defaults: ValuesFile,
  ...settings: [string, string, string, string?]
) => {
  const diff = extractDiffFromForm(form, defaults)

  return generateCommandLines(diff, ...settings)
}

const REPO_URL = 'REPO_URL'
const REPO_NAME = 'REPO_NAME'
const REPO_ENTRY = 'REPO_ENTRY'
const repoData = [REPO_URL, REPO_NAME, REPO_ENTRY] as const

describe('commands generation', () => {
  describe('common repo settings', () => {
    it('should add repo and use its entry', () => {
      const lines = generateCommands([], {}, ...repoData)

      expect(lines[0]).toBe(`helm repo add REPO_NAME REPO_URL`)
      expect(lines[1]).toBe(
        ['helm install REPO_NAME/REPO_ENTRY', '--name=REPO_ENTRY'].join(NEW_LINE),
      )
    })
    it('should add flags of creating new namespace and use it for itself', () => {
      const installC = generateCommands([], {}, ...repoData, 'NAMESPACE')[1]

      expect(installC).toEqual(expect.stringContaining('--create-namespace'))
      expect(installC).toEqual(expect.stringContaining("--namespace 'NAMESPACE'"))
    })
  })

  describe('install command structure', () => {
    it('should yield a command where each flag is on its own line command itself has nesessary spaces', () => {
      const listItem = Text(false, [], 'TEXT')

      const fields: Fields = [
        Text(false, ['text'], 'TEXT'),
        Number(false, ['number'], 123, false),
        Switcher(false, ['switcher'], true),
        Pairs(false, ['pairs'], [['one', 'oneV']]),
        Select(false, ['select'], 'ONE', ['ONE', 'TWO']),
        List(false, ['list'], listItem, [clone(listItem)]),
      ]

      const result = [
        'helm install REPO_NAME/REPO_ENTRY',
        '--name=REPO_ENTRY',
        '--set-string "text=TEXT"',
        '--set "number=123"',
        '--set "switcher=true"',
        '--set-json \'pairs={"one":"oneV"}\'',
        '--set-string "select=ONE"',
        '--set-json \'list=["TEXT"]\'',
      ].join(NEW_LINE)

      const installC = generateCommands(fields, {}, ...repoData)[1]

      expect(installC).toBe(result)
    })
  })

  describe('setting of the string value (Text, Select, Pairs that change value)', () => {
    it('should create --set-string flag', () => {
      const listItem = Text(false, [], 'DEFAULT')

      const fields: Fields = [
        // Text
        Text(false, ['nested', 'path', 'text'], 'DEFAULT'),
        Text(false, ['textWithoutDefault'], 'DEFAULT'),
        Text(false, ['textWithDifferentDefault'], 'NOT_DEFAULT'),
        // Pairs
        Pairs(
          false,
          ['pairsWithDifferentDefault'],
          [
            ['one', 'oneAnother'],
            ['two', 'twoAnother'],
          ],
        ),
        // Select
        Select(false, ['nested', 'path', 'select'], 'ONE', ['ONE', 'TWO']),
        Select(false, ['selectWithoutDefault'], 'ONE', ['ONE', 'TWO']),
        Select(false, ['selectWithDifferentDefault'], 'TWO', ['ONE', 'TWO']),
        // List
        List(false, ['listWithDifferentDefault'], listItem, [
          { ...listItem, value: 'NOT_DEFAULT' },
        ]),
      ]
      const installC = generateCommands(
        fields,
        {
          textWithDifferentDefault: 'DEFAULT',
          pairsWithDifferentDefault: { one: 'oneV', two: 'twoV' },
          selectWithDifferentDefault: 'ONE',
          listWithDifferentDefault: ['DEFAULT'],
        },
        ...repoData,
      )[1]

      expect(installC).toEqual(expect.stringContaining('--set-string "nested.path.text=DEFAULT"'))
      expect(installC).toEqual(expect.stringContaining('--set-string "textWithoutDefault=DEFAULT"'))
      expect(installC).toEqual(
        expect.stringContaining('--set-string "textWithDifferentDefault=NOT_DEFAULT"'),
      )

      expect(installC).toEqual(
        expect.stringContaining('--set-string "pairsWithDifferentDefault.one=oneAnother"'),
      )
      expect(installC).toEqual(
        expect.stringContaining('--set-string "pairsWithDifferentDefault.two=twoAnother"'),
      )

      expect(installC).toEqual(expect.stringContaining('--set-string "nested.path.select=ONE"'))
      expect(installC).toEqual(expect.stringContaining('--set-string "selectWithoutDefault=ONE"'))
      expect(installC).toEqual(
        expect.stringContaining('--set-string "selectWithDifferentDefault=TWO"'),
      )

      expect(installC).toEqual(
        expect.stringContaining('--set-string "listWithDifferentDefault[0]=NOT_DEFAULT"'),
      )
    })
    it("should not yield the --set-string if the value doesn't differ from default record", () => {
      const listItem = Text(false, [], 'DEFAULT')

      const fields: Fields = [
        Text(false, ['nested', 'text'], 'DEFAULT'),
        Text(false, ['text'], 'DEFAULT'),
        Select(false, ['select'], 'ONE', ['ONE', 'TWO']),
        Pairs(
          false,
          ['pairs'],
          [
            ['one', 'oneV'],
            ['two', 'twoV'],
          ],
        ),
        List(false, ['list'], listItem, [listItem]),
      ]
      const installC = generateCommands(
        fields,
        {
          text: 'DEFAULT',
          nested: { text: 'DEFAULT' },
          select: 'ONE',
          list: ['DEFAULT'],
          pairs: { one: 'oneV', two: 'twoV' },
        },
        ...repoData,
      )[1]

      expect(installC).not.toEqual(expect.stringContaining('--set'))
    })
  })

  describe('setting of the primitive non-string value (Number, Switcher)', () => {
    it('should create --set flag', () => {
      const listItem = Number(false, [], 123, false)

      const fields: Fields = [
        // Number
        Number(false, ['nested', 'path', 'number'], 123, false),
        Number(false, ['numberWithoutDefault'], 234, false),
        { ...Number(false, ['numberWithDifferentDefault'], 345, false), value: 456 },
        // Switcher
        Switcher(false, ['nested', 'path', 'switcher'], true),
        Switcher(false, ['switcherWithoutDefault'], true),
        { ...Switcher(false, ['switcherWithDifferentDefault'], true), value: false },
        // Select
        Select(false, ['nested', 'path', 'select'], 2, [1, 2]),
        Select(false, ['selectWithoutDefault'], 1, [1, 2]),
        Select(false, ['selectWithDifferentDefault'], 2, [1, 2]),
        // List
        List(false, ['listWithDifferentDefault'], listItem, [{ ...listItem, value: 345 }]),
      ]

      const defaults = {
        numberWithDifferentDefault: 345,
        switcherWithDifferentDefault: true,
        pairsWithEmptyDefault: [],
        listWithDifferentDefault: [123],
        selectWithDifferentDefault: 1,
      }

      const installC = generateCommands(fields, defaults, ...repoData)[1]

      expect(installC).toEqual(expect.stringContaining('--set "nested.path.number=123"'))
      expect(installC).toEqual(expect.stringContaining('--set "numberWithoutDefault=234"'))
      expect(installC).toEqual(expect.stringContaining('--set "numberWithDifferentDefault=456"'))

      expect(installC).toEqual(expect.stringContaining('--set "nested.path.switcher=true"'))
      expect(installC).toEqual(expect.stringContaining('--set "switcherWithoutDefault=true"'))
      expect(installC).toEqual(
        expect.stringContaining('--set "switcherWithDifferentDefault=false"'),
      )

      expect(installC).toEqual(expect.stringContaining('--set "nested.path.select=2"'))
      expect(installC).toEqual(expect.stringContaining('--set "selectWithoutDefault=1"'))
      expect(installC).toEqual(expect.stringContaining('--set "selectWithDifferentDefault=2"'))

      expect(installC).toEqual(expect.stringContaining('--set "listWithDifferentDefault[0]=345"'))
    })
    it("should not yield the --set if the value doesn't differ from default record", () => {
      const fields: Fields = [
        // Number
        Number(false, ['nested', 'number'], 123, false),
        Number(false, ['number'], 234, false),
        // Switcher
        Switcher(false, ['nested', 'switcher'], true),
        Switcher(false, ['switcher'], true),
      ]

      const defaults = {
        nested: {
          number: 123,
          switcher: true,
        },
        number: 234,
        switcher: true,
      }

      const installC = generateCommands(fields, defaults, ...repoData)[1]

      expect(installC).not.toEqual(expect.stringContaining('--set'))
    })
  })
  describe('set of the complex structures via --set-json', () => {
    it('should create --set-json flag for Pairs that are not present in defaults', () => {
      const value: Array<[string, string]> = [
        ['one', 'oneV'],
        ['two', 'twoV'],
      ]
      const jsonValue = JSON.stringify(fromPairs(value))
      const fields: Fields = [Pairs(false, ['nested', 'pairs'], value)]
      const installC = generateCommands(fields, {}, ...repoData)[1]

      expect(installC).toEqual(expect.stringContaining(`--set-json 'nested.pairs=${jsonValue}'`))
    })
    it('should create --set-json flag for List that is not present in defaults', () => {
      const text = Text(false, [], 'DEFAULT')
      const fields: Fields = [
        List(false, ['nested', 'array'], text, [
          clone(text),
          clone({ ...text, value: 'ANOTHER_VALUE' }),
        ]),
      ]
      const result = JSON.stringify(['DEFAULT', 'ANOTHER_VALUE'])

      const installC = generateCommands(fields, {}, ...repoData)[1]

      expect(installC).toEqual(expect.stringContaining(`--set-json 'nested.array=${result}'`))
    })
    it('should create --set-json flag for new or changed nested items of the array', () => {
      const textOne = Text(false, ['one'], 'DEFAULT_ONE')
      const textTwo = Text(false, ['two'], 'DEFAULT_TWO')

      const fields: Fields = [
        List(
          false,
          ['array'],
          [textOne, textTwo],
          [
            [clone(textOne), clone(textTwo)],
            [clone(textOne), clone(textTwo)],
          ],
        ),
      ]
      const defaults = { array: [{ one: 'DEFAULT_ONE', two: 'DEFAULT_TWO' }] }
      const result = JSON.stringify({ one: 'DEFAULT_ONE', two: 'DEFAULT_TWO' })

      const installC = generateCommands(fields, defaults, ...repoData)[1]

      expect(installC).toEqual(expect.stringContaining(`--set-json 'array[1]=${result}'`))
    })
  })
  describe('escaping special characters in keys', () => {
    it('should escape such characters in value keys as `.` or `[` or `,` or `=`', () => {
      const fields: Fields = [
        Text(false, ['nested.annotation'], 'DEFAULT'),
        Text(false, ['oneValue=anotherValue'], 'DEFAULT'),
        Text(false, ['this,thisAndThis'], 'DEFAULT'),
        Text(false, ['[Required]Field'], 'DEFAULT'),
        Text(false, ['every[thing].at=once,'], 'DEFAULT'),
      ]

      const installC = generateCommands(fields, {}, ...repoData)[1]

      /* eslint-disable */
      expect(installC).toEqual(expect.stringContaining('--set-string "nested\\.annotation=DEFAULT"'))
      expect(installC).toEqual(expect.stringContaining('--set-string "oneValue\\=anotherValue=DEFAULT"'))
      expect(installC).toEqual(expect.stringContaining('--set-string "this\\,thisAndThis=DEFAULT"'))
      expect(installC).toEqual(expect.stringContaining('--set-string "\\[Required]Field=DEFAULT"'))
      expect(installC).toEqual(expect.stringContaining('--set-string "every\\[thing]\\.at\\=once\\,=DEFAULT"'))
      /* eslint-enable */
    })
    it('should escape single quotes in json', () => {
      const listItem = Text(false, [], "'DEFAULT'")
      const fields: Fields = [
        List(false, ['array'], listItem, [clone(listItem)]),
        Pairs(false, ['pairs'], [['one', "one'V"]]),
      ]

      const installC = generateCommands(fields, {}, ...repoData)[1]

      expect(installC).toEqual(expect.stringContaining(`--set-json 'array=["\\'DEFAULT\\'"]'`))
      expect(installC).toEqual(expect.stringContaining(`--set-json 'pairs={"one":"one\\'V"}'`))
    })
    it('should escape double quotes in a string', () => {
      const fields: Fields = [Text(false, ['text'], '"DEFAULT"')]

      const installC = generateCommands(fields, {}, ...repoData)[1]

      expect(installC).toEqual(expect.stringContaining(`--set-string "text=\\"DEFAULT\\""`))
    })
  })
  describe('unsetting values', () => {
    it('should unset values that are present in defaults but not anymore (e.g. removable items of Pairs and List)', () => {
      const listItem = Text(false, [], 'DEFAULT')

      const fields: Fields = [
        Pairs(false, ['pairsFirstItemRemoved'], [['two', 'twoV']]),
        Pairs(false, ['pairsSecondItemRemoved'], [['one', 'oneV']]),
        List(false, ['listFirstItemRemoved'], listItem, [{ ...clone(listItem), value: 'TWO' }]),
        List(false, ['listSecondItemRemoved'], listItem, [{ ...clone(listItem), value: 'ONE' }]),
      ]

      const defaults = {
        pairsFirstItemRemoved: {
          one: 'oneV',
          two: 'twoV',
        },
        pairsSecondItemRemoved: {
          one: 'oneV',
          two: 'twoV',
        },
        listFirstItemRemoved: ['ONE', 'TWO'],
        listSecondItemRemoved: ['ONE', 'TWO'],
      }

      const installC = generateCommands(fields, defaults, ...repoData)[1]

      expect(installC).toEqual(expect.stringContaining('--set "pairsFirstItemRemoved.one=null"'))
      expect(installC).toEqual(expect.stringContaining('--set "pairsSecondItemRemoved.two=null"'))

      expect(installC).toEqual(
        expect.stringContaining('--set-string "listFirstItemRemoved[0]=TWO"'),
      )
      expect(installC).toEqual(expect.stringContaining('--set "listFirstItemRemoved[1]=null"'))
      expect(installC).toEqual(expect.stringContaining('--set "listSecondItemRemoved[1]=null"'))
    })
  })
})
