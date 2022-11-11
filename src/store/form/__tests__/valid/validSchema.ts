import { SchemaFile, ValuesFile } from '@/model/Repo'
import yaml from 'js-yaml'

export const validYamlValues = yaml.load(`
stringWithDefaultInYaml: DEFAULT_IN_YAML
numberWithDefaultInYaml: 123
integerWithDefaultInYaml: 456
booleanWithDefaultInYaml: true
pairsWithDefaultInYaml:
  one: one
  two: two
arrayWithDefaultInYaml:
  - one: one1
    two: 123
  - one: one2
`) as ValuesFile
export const validSchema = {
  type: 'object',
  properties: {
    // STRING
    string: {
      type: 'string',
    },
    stringWithDefault: {
      type: 'string',
      default: 'DEFAULT',
    },
    stringWithDefaultInYaml: {
      type: 'string',
    },
    stringEnum: {
      type: 'string',
      default: 'ONE',
      enum: ['ONE', 'TWO', 'THREE'],
    },
    stringEnumWithMissingDefault: {
      type: 'string',
      default: 'FOUR',
      enum: ['ONE', 'TWO', 'THREE'],
    },
    stringWithTitleAndDescription: {
      type: 'string',
      title: 'TITLE',
      description: 'DESCRIPTION',
    },
    // NUMBER
    number: {
      type: 'number',
    },
    numberWithDefault: {
      type: 'number',
      default: 987,
    },
    numberWithDefaultInYaml: {
      type: 'number',
    },
    numberEnum: {
      type: 'number',
      default: 1,
      enum: [1, 2, 3],
    },
    numberEnumWithMissingDefault: {
      type: 'number',
      default: 4,
      enum: [1, 2, 3],
    },
    numberWithTitleAndDescription: {
      type: 'number',
      title: 'TITLE',
      description: 'DESCRIPTION',
    },
    // INTEGER
    integer: {
      type: 'integer',
    },
    integerWithDefault: {
      type: 'integer',
      default: 987,
    },
    integerWithDefaultInYaml: {
      type: 'integer',
    },
    integerEnum: {
      type: 'integer',
      default: 1,
      enum: [1, 2, 3],
    },
    integerEnumWithMissingDefault: {
      type: 'integer',
      default: 4,
      enum: [1, 2, 3],
    },
    integerWithTitleAndDescription: {
      type: 'integer',
      title: 'TITLE',
      description: 'DESCRIPTION',
    },
    // BOOLEAN
    boolean: {
      type: 'boolean',
    },
    booleanWithDefault: {
      type: 'boolean',
      default: true,
    },
    booleanWithDefaultInYaml: {
      type: 'boolean',
    },
    booleanWithTitleAndDescription: {
      type: 'boolean',
      title: 'TITLE',
      description: 'DESCRIPTION',
    },
    // PAIR
    pairs: {
      type: 'object',
    },
    pairsWithDefault: {
      type: 'object',
      default: {
        one: 'one',
        two: 'two',
      },
    },
    pairsWithDefaultInYaml: {
      type: 'object',
    },
    pairsWithTitleAndDescription: {
      type: 'object',
      title: 'TITLE',
      description: 'DESCRIPTION',
    },
    // ARRAY
    arrayOfStrings: {
      type: 'array',
      items: {
        type: 'string',
        default: 'DEFAULT',
      },
    },
    arrayOfNumbers: {
      type: 'array',
      items: {
        type: 'number',
        default: 123,
      },
    },
    arrayOfIntegers: {
      type: 'array',
      items: {
        type: 'integer',
        default: 456,
      },
    },
    arrayOfPairs: {
      type: 'array',
      items: {
        type: 'object',
      },
    },
    arrayOfObjects: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          one: {
            type: 'string',
            default: 'DEFAULT',
          },
          two: {
            type: 'number',
          },
        },
      },
    },
    arrayOfArrays: {
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
    arrayOfObjectsWithArrays: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          one: {
            type: 'string',
            default: 'DEFAULT',
          },
          two: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
    },
    arrayOfDifferentTypes: {
      type: 'array',
      items: [
        {
          type: 'number',
          default: 123,
        },
        {
          type: 'string',
          default: 'DEFAULT',
        },
      ],
    },
    arrayWithDefault: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          one: {
            type: 'string',
            default: 'DEFAULT',
          },
          two: {
            type: 'number',
          },
        },
      },
      default: [{ one: 'one1', two: 123 }, { one: 'one2' }],
    },
    arrayWithDefaultInYaml: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          one: {
            type: 'string',
            default: 'DEFAULT',
          },
          two: {
            type: 'number',
          },
        },
      },
    },
    arrayWithTitleAndDescription: {
      type: 'array',
      items: {
        type: 'string',
      },
      title: 'TITLE',
      description: 'DESCRIPTION',
    },

    nested: {
      type: 'object',
      properties: {
        string: {
          type: 'string',
        },
        number: {
          type: 'number',
        },
        integer: {
          type: 'integer',
        },
        pairs: {
          type: 'object',
        },
        arrayOfStrings: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  },
} as SchemaFile
