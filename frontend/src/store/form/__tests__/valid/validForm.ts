export const validForm = [
  {
    required: false,
    title: 'string',
    defaultValue: '',
    value: '',
    path: ['string'],
    fullKey: 'string',
    key: 'string',
    type: 'text',
  },
  {
    required: false,
    title: 'stringWithDefault',
    defaultValue: 'DEFAULT',
    value: 'DEFAULT',
    path: ['stringWithDefault'],
    fullKey: 'stringWithDefault',
    key: 'stringWithDefault',
    type: 'text',
  },
  {
    required: false,
    title: 'stringWithDefaultInYaml',
    defaultValue: 'DEFAULT_IN_YAML',
    value: 'DEFAULT_IN_YAML',
    path: ['stringWithDefaultInYaml'],
    fullKey: 'stringWithDefaultInYaml',
    key: 'stringWithDefaultInYaml',
    type: 'text',
  },
  {
    required: false,
    title: 'stringEnum',
    defaultValue: 'ONE',
    value: 'ONE',
    options: ['ONE', 'TWO', 'THREE'],
    path: ['stringEnum'],
    fullKey: 'stringEnum',
    key: 'stringEnum',
    type: 'select',
  },
  {
    required: false,
    title: 'stringEnumWithMissingDefault',
    defaultValue: 'FOUR',
    value: 'FOUR',
    options: ['FOUR', 'ONE', 'TWO', 'THREE'],
    path: ['stringEnumWithMissingDefault'],
    fullKey: 'stringEnumWithMissingDefault',
    key: 'stringEnumWithMissingDefault',
    type: 'select',
  },
  {
    required: false,
    title: 'TITLE',
    description: 'DESCRIPTION',
    defaultValue: '',
    value: '',
    path: ['stringWithTitleAndDescription'],
    fullKey: 'stringWithTitleAndDescription',
    key: 'stringWithTitleAndDescription',
    type: 'text',
  },
  {
    required: false,
    title: 'number',
    defaultValue: 0,
    value: 0,
    path: ['number'],
    fullKey: 'number',
    key: 'number',
    subSet: 'number',
    type: 'number',
  },
  {
    required: false,
    title: 'numberWithDefault',
    defaultValue: 987,
    value: 987,
    path: ['numberWithDefault'],
    fullKey: 'numberWithDefault',
    key: 'numberWithDefault',
    subSet: 'number',
    type: 'number',
  },
  {
    required: false,
    title: 'numberWithDefaultInYaml',
    defaultValue: 123,
    value: 123,
    path: ['numberWithDefaultInYaml'],
    fullKey: 'numberWithDefaultInYaml',
    key: 'numberWithDefaultInYaml',
    subSet: 'number',
    type: 'number',
  },
  {
    required: false,
    title: 'numberEnum',
    defaultValue: 1,
    value: 1,
    options: [1, 2, 3],
    path: ['numberEnum'],
    fullKey: 'numberEnum',
    key: 'numberEnum',
    type: 'select',
  },
  {
    required: false,
    title: 'numberEnumWithMissingDefault',
    defaultValue: 4,
    value: 4,
    options: [4, 1, 2, 3],
    path: ['numberEnumWithMissingDefault'],
    fullKey: 'numberEnumWithMissingDefault',
    key: 'numberEnumWithMissingDefault',
    type: 'select',
  },
  {
    required: false,
    title: 'TITLE',
    description: 'DESCRIPTION',
    defaultValue: 0,
    value: 0,
    path: ['numberWithTitleAndDescription'],
    fullKey: 'numberWithTitleAndDescription',
    key: 'numberWithTitleAndDescription',
    subSet: 'number',
    type: 'number',
  },
  {
    required: false,
    title: 'integer',
    defaultValue: 0,
    value: 0,
    path: ['integer'],
    fullKey: 'integer',
    key: 'integer',
    subSet: 'integer',
    type: 'number',
  },
  {
    required: false,
    title: 'integerWithDefault',
    defaultValue: 987,
    value: 987,
    path: ['integerWithDefault'],
    fullKey: 'integerWithDefault',
    key: 'integerWithDefault',
    subSet: 'integer',
    type: 'number',
  },
  {
    required: false,
    title: 'integerWithDefaultInYaml',
    defaultValue: 456,
    value: 456,
    path: ['integerWithDefaultInYaml'],
    fullKey: 'integerWithDefaultInYaml',
    key: 'integerWithDefaultInYaml',
    subSet: 'integer',
    type: 'number',
  },
  {
    required: false,
    title: 'integerEnum',
    defaultValue: 1,
    value: 1,
    options: [1, 2, 3],
    path: ['integerEnum'],
    fullKey: 'integerEnum',
    key: 'integerEnum',
    type: 'select',
  },
  {
    required: false,
    title: 'integerEnumWithMissingDefault',
    defaultValue: 4,
    value: 4,
    options: [4, 1, 2, 3],
    path: ['integerEnumWithMissingDefault'],
    fullKey: 'integerEnumWithMissingDefault',
    key: 'integerEnumWithMissingDefault',
    type: 'select',
  },
  {
    required: false,
    title: 'TITLE',
    description: 'DESCRIPTION',
    defaultValue: 0,
    value: 0,
    path: ['integerWithTitleAndDescription'],
    fullKey: 'integerWithTitleAndDescription',
    key: 'integerWithTitleAndDescription',
    subSet: 'integer',
    type: 'number',
  },
  {
    required: false,
    title: 'boolean',
    defaultValue: false,
    value: false,
    path: ['boolean'],
    fullKey: 'boolean',
    key: 'boolean',
    type: 'switcher',
  },
  {
    required: false,
    title: 'booleanWithDefault',
    defaultValue: true,
    value: true,
    path: ['booleanWithDefault'],
    fullKey: 'booleanWithDefault',
    key: 'booleanWithDefault',
    type: 'switcher',
  },
  {
    required: false,
    title: 'booleanWithDefaultInYaml',
    defaultValue: true,
    value: true,
    path: ['booleanWithDefaultInYaml'],
    fullKey: 'booleanWithDefaultInYaml',
    key: 'booleanWithDefaultInYaml',
    type: 'switcher',
  },
  {
    required: false,
    title: 'TITLE',
    description: 'DESCRIPTION',
    defaultValue: false,
    value: false,
    path: ['booleanWithTitleAndDescription'],
    fullKey: 'booleanWithTitleAndDescription',
    key: 'booleanWithTitleAndDescription',
    type: 'switcher',
  },
  {
    required: false,
    title: 'pairs',
    defaultValue: [],
    value: [],
    path: ['pairs'],
    fullKey: 'pairs',
    key: 'pairs',
    type: 'pairs',
  },
  {
    required: false,
    title: 'pairsWithDefault',
    defaultValue: [
      ['one', 'one'],
      ['two', 'two'],
    ],
    value: [
      ['one', 'one'],
      ['two', 'two'],
    ],
    path: ['pairsWithDefault'],
    fullKey: 'pairsWithDefault',
    key: 'pairsWithDefault',
    type: 'pairs',
  },
  {
    required: false,
    title: 'pairsWithDefaultInYaml',
    defaultValue: [
      ['one', 'one'],
      ['two', 'two'],
    ],
    value: [
      ['one', 'one'],
      ['two', 'two'],
    ],
    path: ['pairsWithDefaultInYaml'],
    fullKey: 'pairsWithDefaultInYaml',
    key: 'pairsWithDefaultInYaml',
    type: 'pairs',
  },
  {
    required: false,
    title: 'TITLE',
    description: 'DESCRIPTION',
    defaultValue: [],
    value: [],
    path: ['pairsWithTitleAndDescription'],
    fullKey: 'pairsWithTitleAndDescription',
    key: 'pairsWithTitleAndDescription',
    type: 'pairs',
  },
  {
    required: false,
    title: 'arrayOfStrings',
    structure: {
      required: false,
      title: '',
      defaultValue: 'DEFAULT',
      value: 'DEFAULT',
      path: [],
      fullKey: '',
      key: '',
      type: 'text',
    },
    defaultValue: [],
    value: [],
    path: ['arrayOfStrings'],
    fullKey: 'arrayOfStrings',
    key: 'arrayOfStrings',
    type: 'list',
  },
  {
    required: false,
    title: 'arrayOfNumbers',
    structure: {
      required: false,
      title: '',
      defaultValue: 123,
      value: 123,
      path: [],
      fullKey: '',
      key: '',
      subSet: 'number',
      type: 'number',
    },
    defaultValue: [],
    value: [],
    path: ['arrayOfNumbers'],
    fullKey: 'arrayOfNumbers',
    key: 'arrayOfNumbers',
    type: 'list',
  },
  {
    required: false,
    title: 'arrayOfIntegers',
    structure: {
      required: false,
      title: '',
      defaultValue: 456,
      value: 456,
      path: [],
      fullKey: '',
      key: '',
      subSet: 'integer',
      type: 'number',
    },
    defaultValue: [],
    value: [],
    path: ['arrayOfIntegers'],
    fullKey: 'arrayOfIntegers',
    key: 'arrayOfIntegers',
    type: 'list',
  },
  {
    required: false,
    title: 'arrayOfPairs',
    structure: {
      required: false,
      title: '',
      defaultValue: [],
      value: [],
      path: [],
      fullKey: '',
      key: '',
      type: 'pairs',
    },
    defaultValue: [],
    value: [],
    path: ['arrayOfPairs'],
    fullKey: 'arrayOfPairs',
    key: 'arrayOfPairs',
    type: 'list',
  },
  {
    required: false,
    title: 'arrayOfObjects',
    structure: [
      {
        required: false,
        title: 'one',
        defaultValue: 'DEFAULT',
        value: 'DEFAULT',
        path: ['one'],
        fullKey: 'one',
        key: 'one',
        type: 'text',
      },
      {
        required: false,
        title: 'two',
        defaultValue: 0,
        value: 0,
        path: ['two'],
        fullKey: 'two',
        key: 'two',
        subSet: 'number',
        type: 'number',
      },
    ],
    defaultValue: [],
    value: [],
    path: ['arrayOfObjects'],
    fullKey: 'arrayOfObjects',
    key: 'arrayOfObjects',
    type: 'list',
  },
  {
    required: false,
    title: 'arrayOfArrays',
    structure: {
      required: false,
      title: '',
      structure: {
        required: false,
        title: '',
        defaultValue: '',
        value: '',
        path: [],
        fullKey: '',
        key: '',
        type: 'text',
      },
      defaultValue: [],
      value: [],
      path: [],
      fullKey: '',
      key: '',
      type: 'list',
    },
    defaultValue: [],
    value: [],
    path: ['arrayOfArrays'],
    fullKey: 'arrayOfArrays',
    key: 'arrayOfArrays',
    type: 'list',
  },
  {
    required: false,
    title: 'arrayOfObjectsWithArrays',
    structure: [
      {
        required: false,
        title: 'one',
        defaultValue: 'DEFAULT',
        value: 'DEFAULT',
        path: ['one'],
        fullKey: 'one',
        key: 'one',
        type: 'text',
      },
      {
        required: false,
        title: 'two',
        structure: {
          required: false,
          title: '',
          defaultValue: '',
          value: '',
          path: [],
          fullKey: '',
          key: '',
          type: 'text',
        },
        defaultValue: [],
        value: [],
        path: ['two'],
        fullKey: 'two',
        key: 'two',
        type: 'list',
      },
    ],
    defaultValue: [],
    value: [],
    path: ['arrayOfObjectsWithArrays'],
    fullKey: 'arrayOfObjectsWithArrays',
    key: 'arrayOfObjectsWithArrays',
    type: 'list',
  },
  {
    required: false,
    title: 'arrayOfDifferentTypes',
    structure: {
      required: false,
      title: '',
      defaultValue: 123,
      value: 123,
      path: [],
      fullKey: '',
      key: '',
      subSet: 'number',
      type: 'number',
    },
    defaultValue: [],
    value: [],
    path: ['arrayOfDifferentTypes'],
    fullKey: 'arrayOfDifferentTypes',
    key: 'arrayOfDifferentTypes',
    type: 'list',
  },
  {
    required: false,
    title: 'arrayWithDefault',
    structure: [
      {
        required: false,
        title: 'one',
        defaultValue: 'DEFAULT',
        value: 'DEFAULT',
        path: ['one'],
        fullKey: 'one',
        key: 'one',
        type: 'text',
      },
      {
        required: false,
        title: 'two',
        defaultValue: 0,
        value: 0,
        path: ['two'],
        fullKey: 'two',
        key: 'two',
        subSet: 'number',
        type: 'number',
      },
    ],
    defaultValue: [
      [
        {
          required: false,
          title: 'one',
          defaultValue: 'one1',
          value: 'one1',
          path: ['one'],
          fullKey: 'one',
          key: 'one',
          type: 'text',
        },
        {
          required: false,
          title: 'two',
          defaultValue: 123,
          value: 123,
          path: ['two'],
          fullKey: 'two',
          key: 'two',
          subSet: 'number',
          type: 'number',
        },
      ],
      [
        {
          required: false,
          title: 'one',
          defaultValue: 'one2',
          value: 'one2',
          path: ['one'],
          fullKey: 'one',
          key: 'one',
          type: 'text',
        },
        {
          required: false,
          title: 'two',
          defaultValue: 0,
          value: 0,
          path: ['two'],
          fullKey: 'two',
          key: 'two',
          subSet: 'number',
          type: 'number',
        },
      ],
    ],
    value: [
      [
        {
          required: false,
          title: 'one',
          defaultValue: 'one1',
          value: 'one1',
          path: ['one'],
          fullKey: 'one',
          key: 'one',
          type: 'text',
        },
        {
          required: false,
          title: 'two',
          defaultValue: 123,
          value: 123,
          path: ['two'],
          fullKey: 'two',
          key: 'two',
          subSet: 'number',
          type: 'number',
        },
      ],
      [
        {
          required: false,
          title: 'one',
          defaultValue: 'one2',
          value: 'one2',
          path: ['one'],
          fullKey: 'one',
          key: 'one',
          type: 'text',
        },
        {
          required: false,
          title: 'two',
          defaultValue: 0,
          value: 0,
          path: ['two'],
          fullKey: 'two',
          key: 'two',
          subSet: 'number',
          type: 'number',
        },
      ],
    ],
    path: ['arrayWithDefault'],
    fullKey: 'arrayWithDefault',
    key: 'arrayWithDefault',
    type: 'list',
  },
  {
    required: false,
    title: 'arrayWithDefaultInYaml',
    structure: [
      {
        required: false,
        title: 'one',
        defaultValue: 'DEFAULT',
        value: 'DEFAULT',
        path: ['one'],
        fullKey: 'one',
        key: 'one',
        type: 'text',
      },
      {
        required: false,
        title: 'two',
        defaultValue: 0,
        value: 0,
        path: ['two'],
        fullKey: 'two',
        key: 'two',
        subSet: 'number',
        type: 'number',
      },
    ],
    defaultValue: [
      [
        {
          required: false,
          title: 'one',
          defaultValue: 'one1',
          value: 'one1',
          path: ['one'],
          fullKey: 'one',
          key: 'one',
          type: 'text',
        },
        {
          required: false,
          title: 'two',
          defaultValue: 123,
          value: 123,
          path: ['two'],
          fullKey: 'two',
          key: 'two',
          subSet: 'number',
          type: 'number',
        },
      ],
      [
        {
          required: false,
          title: 'one',
          defaultValue: 'one2',
          value: 'one2',
          path: ['one'],
          fullKey: 'one',
          key: 'one',
          type: 'text',
        },
        {
          required: false,
          title: 'two',
          defaultValue: 0,
          value: 0,
          path: ['two'],
          fullKey: 'two',
          key: 'two',
          subSet: 'number',
          type: 'number',
        },
      ],
    ],
    value: [
      [
        {
          required: false,
          title: 'one',
          defaultValue: 'one1',
          value: 'one1',
          path: ['one'],
          fullKey: 'one',
          key: 'one',
          type: 'text',
        },
        {
          required: false,
          title: 'two',
          defaultValue: 123,
          value: 123,
          path: ['two'],
          fullKey: 'two',
          key: 'two',
          subSet: 'number',
          type: 'number',
        },
      ],
      [
        {
          required: false,
          title: 'one',
          defaultValue: 'one2',
          value: 'one2',
          path: ['one'],
          fullKey: 'one',
          key: 'one',
          type: 'text',
        },
        {
          required: false,
          title: 'two',
          defaultValue: 0,
          value: 0,
          path: ['two'],
          fullKey: 'two',
          key: 'two',
          subSet: 'number',
          type: 'number',
        },
      ],
    ],
    path: ['arrayWithDefaultInYaml'],
    fullKey: 'arrayWithDefaultInYaml',
    key: 'arrayWithDefaultInYaml',
    type: 'list',
  },
  {
    required: false,
    title: 'TITLE',
    description: 'DESCRIPTION',
    structure: {
      required: false,
      title: '',
      defaultValue: '',
      value: '',
      path: [],
      fullKey: '',
      key: '',
      type: 'text',
    },
    defaultValue: [],
    value: [],
    path: ['arrayWithTitleAndDescription'],
    fullKey: 'arrayWithTitleAndDescription',
    key: 'arrayWithTitleAndDescription',
    type: 'list',
  },

  {
    required: false,
    title: 'nested.string',
    defaultValue: '',
    value: '',
    path: ['nested', 'string'],
    fullKey: 'nested.string',
    key: 'string',
    type: 'text',
  },
  {
    required: false,
    title: 'nested.number',
    defaultValue: 0,
    value: 0,
    path: ['nested', 'number'],
    fullKey: 'nested.number',
    key: 'number',
    subSet: 'number',
    type: 'number',
  },
  {
    required: false,
    title: 'nested.integer',
    defaultValue: 0,
    value: 0,
    path: ['nested', 'integer'],
    fullKey: 'nested.integer',
    key: 'integer',
    subSet: 'integer',
    type: 'number',
  },
  {
    required: false,
    title: 'nested.pairs',
    defaultValue: [],
    value: [],
    path: ['nested', 'pairs'],
    fullKey: 'nested.pairs',
    key: 'pairs',
    type: 'pairs',
  },
  {
    required: false,
    title: 'nested.arrayOfStrings',
    structure: {
      required: false,
      title: '',
      defaultValue: '',
      value: '',
      path: [],
      fullKey: '',
      key: '',
      type: 'text',
    },
    defaultValue: [],
    value: [],
    path: ['nested', 'arrayOfStrings'],
    fullKey: 'nested.arrayOfStrings',
    key: 'arrayOfStrings',
    type: 'list',
  },
]