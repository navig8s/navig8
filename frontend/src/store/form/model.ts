import { JSONSchema, SchemaFile, ValuesFile } from '@/model/Repo'
import { clone, isNil, path as getByPath } from 'ramda'
import { FormConstructionError } from './error'

export type PrimitiveValue = string | number | boolean
export type ObjectValue = Record<string, PrimitiveValue | ArrayValue>
export type ArrayValue = Array<PrimitiveValue | ObjectValue>
export type Value = PrimitiveValue | ObjectValue | ArrayValue
export type Values = Record<string, Value>

export type Select = {
  required: boolean
  title: string
  description?: string
  defaultValue: number | string
  value: number | string
  options: Array<number | string>
  path: string[]
  fullKey: string
  key: string
  readonly type: 'select'
}
export type Text = {
  required: boolean
  title: string
  description?: string
  defaultValue: string
  value: string
  path: string[]
  fullKey: string
  key: string
  readonly type: 'text'
}
export type Number = {
  required: boolean
  title: string
  description?: string
  defaultValue: number
  value: number
  path: string[]
  fullKey: string
  key: string
  subSet: 'number' | 'integer'
  readonly type: 'number'
}
export type Switcher = {
  required: boolean
  title: string
  description?: string
  defaultValue: boolean
  value: boolean
  path: string[]
  fullKey: string
  key: string
  readonly type: 'switcher'
}
export type List = {
  required: boolean
  title: string
  description?: string
  structure: NestedFields
  defaultValue: ArrayValue
  value: Fields
  path: string[]
  fullKey: string
  key: string
  readonly type: 'list'
}
export type Pairs = {
  required: boolean
  title: string
  description?: string
  defaultValue: Array<[string, string]>
  value: Array<[string, string]>
  path: string[]
  fullKey: string
  key: string
  readonly type: 'pairs'
}

export type Field = Text | Number | Switcher | List | Pairs | Select

export type Fields = Field[]
type NestedFields = Field | Fields

const isPrimitiveArray = (array: any[]): array is Array<string | number> =>
  array.every(
    (option) =>
      typeof option !== 'object' && typeof option !== 'function' && typeof option !== 'symbol',
  )

const getTitle = (fromKey: string, fromSchema?: string) => fromSchema ?? fromKey

const getDefault = <V>(isCorrectType: boolean, defaultValue: any, fallback: V, fromValues?: V) => {
  if (isCorrectType) return defaultValue
  if (!isNil(fromValues)) return fromValues

  return fallback
}

const generateFormFields = (
  root: JSONSchema,
  path: string[],
  required: boolean,
  values?: ValuesFile,
): Nullable<Field | Field[]> => {
  if (isNil(root.type) || Array.isArray(root.type)) return null

  const requiredSet = new Set(Array.isArray(root.required) ? root.required : [])
  const isSelfRequired = root.required === true || required

  const fullKey = path.join('.')

  if (
    ['string', 'number', 'integer'].includes(root.type) &&
    Array.isArray(root.enum) &&
    root.enum.length > 1 &&
    isPrimitiveArray(root.enum)
  ) {
    const options = [...root.enum]
    const defaultValue = getDefault(
      typeof root.default === 'string',
      root.default,
      '',
      getByPath(path, values),
    )

    if (!options.includes(defaultValue)) options.unshift(defaultValue)

    return {
      type: 'select' as const,
      options,
      required: isSelfRequired,
      title: getTitle(fullKey, root.title),
      description: root.description,
      defaultValue,
      value: defaultValue,
      fullKey,
      key: path[path.length - 1] ?? '',
      path,
    }
  }

  switch (root.type) {
    case 'string': {
      const defaultValue = getDefault(
        typeof root.default === 'string',
        root.default,
        '',
        getByPath(path, values),
      )

      return {
        type: 'text' as const,
        required: isSelfRequired,
        title: getTitle(fullKey, root.title),
        description: root.description,
        defaultValue,
        value: defaultValue,
        fullKey,
        key: path[path.length - 1] ?? '',
        path,
      }
    }
    case 'integer':
    case 'number': {
      const defaultValue = getDefault(
        typeof root.default === 'number',
        root.default,
        0,
        getByPath(path, values),
      )

      return {
        type: 'number' as const,
        subSet: root.type === 'integer' ? 'integer' : 'number',
        required: isSelfRequired,
        title: getTitle(fullKey, root.title),
        description: root.description,
        defaultValue,
        value: defaultValue,
        fullKey,
        key: path[path.length - 1] ?? '',
        path,
      }
    }
    case 'boolean': {
      const defaultValue = getDefault(
        typeof root.default === 'boolean',
        root.default,
        false,
        getByPath(path, values),
      )

      return {
        type: 'switcher' as const,
        required: isSelfRequired,
        title: getTitle(fullKey, root.title),
        description: root.description,
        defaultValue,
        value: defaultValue,
        fullKey,
        key: path[path.length - 1] ?? '',
        path,
      }
    }
    case 'object': {
      if (isNil(root.properties)) {
        const defaultValue = getDefault(
          !isNil(root.default) && Object.keys(root.default).length > 0,
          isNil(root.default) ? root.default : Object.entries(root.default),
          [],
          Object.entries(getByPath(path, values) ?? {}),
        )

        return {
          type: 'pairs',
          required: isSelfRequired,
          title: getTitle(fullKey, root.title),
          description: root.description,
          defaultValue: clone(defaultValue),
          value: clone(defaultValue),
          fullKey,
          key: path[path.length - 1] ?? '',
          path,
        }
      }

      return Object.entries(root.properties)
        .flatMap(([key, config]) =>
          generateFormFields(config, [...path, key], requiredSet.has(key), values),
        )
        .filter(Boolean) as Field[]
    }
    case 'array': {
      // TODO: cover boolean and array cases?
      if (isNil(root.items) || typeof root.items === 'boolean' || Array.isArray(root.items))
        return null

      const structure = generateFormFields(root.items, [], false)
      if (isNil(structure)) return null

      // TODO: map value with structure
      const defaultValue = getDefault(
        Array.isArray(root.default),
        root.default,
        [],
        getByPath(path, values),
      )

      return {
        type: 'list' as const,
        required: isSelfRequired,
        title: getTitle(fullKey, root.title),
        description: root.description,
        structure,
        defaultValue: clone(defaultValue),
        value: clone(defaultValue),
        fullKey,
        key: path[path.length - 1] ?? '',
        path,
      }
    }
  }

  return null
}

export const formStructureFromSchema = (schema: SchemaFile, values: ValuesFile): Fields => {
  const fields = generateFormFields(schema, [], false, values)
  if (isNil(fields) || !Array.isArray(fields)) {
    throw new FormConstructionError()
  }

  return fields
}
