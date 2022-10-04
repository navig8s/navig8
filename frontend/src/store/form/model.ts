import { JSONSchema, SchemaFile, ValuesFile } from '@/model/Repo'
import { isEmpty, isNil, path as getByPath } from 'ramda'

type PrimitiveValue = string | number | boolean
type ObjectValue = Map<string, PrimitiveValue | ArrayValue>
type ArrayValue = Array<PrimitiveValue | ObjectValue>

export type Select = {
  required: boolean
  title?: string
  description?: string
  defaultValue: number | string
  options: Array<number | string>
  path: string[]
  key: string
  readonly type: 'select'
}
export type Text = {
  required: boolean
  title?: string
  description?: string
  defaultValue: string
  path: string[]
  key: string
  readonly type: 'text'
}
export type Number = {
  required: boolean
  title?: string
  description?: string
  defaultValue: number
  path: string[]
  key: string
  subSet: 'number' | 'integer'
  readonly type: 'number'
}
export type Switcher = {
  required: boolean
  title?: string
  description?: string
  defaultValue: boolean
  path: string[]
  key: string
  readonly type: 'switcher'
}
export type List = {
  required: boolean
  title?: string
  description?: string
  structure: NestedFields
  defaultValue: ArrayValue
  path: string[]
  key: string
  readonly type: 'list'
}
export type Pairs = {
  required: boolean
  title?: string
  description?: string
  defaultValue: Array<[string, string]>
  path: string[]
  key: string
  readonly type: 'pairs'
}

export type Field = Text | Number | Switcher | List | Pairs | Select

type Fields = Field[]
type NestedFields = Field | Fields

export type FormStructure = {
  fields: Fields
}

const isPrimitiveArray = (array: any[]): array is Array<string | number> =>
  array.every(
    (option) =>
      typeof option !== 'object' && typeof option !== 'function' && typeof option !== 'symbol',
  )

const getTitle = (fromKey: string, fromSchema?: string) => {
  const fromSchemaOrKey = fromSchema ?? fromKey

  return isEmpty(fromSchemaOrKey) ? undefined : fromSchemaOrKey
}

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

  const key = path.join('.')

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
      title: getTitle(key, root.title),
      description: root.description,
      defaultValue: getDefault(
        typeof root.default === 'string',
        root.default,
        '',
        getByPath(path, values),
      ),
      key,
      path,
    }
  }

  switch (root.type) {
    case 'string':
      return {
        type: 'text' as const,
        required: isSelfRequired,
        title: getTitle(key, root.title),
        description: root.description,
        defaultValue: getDefault(
          typeof root.default === 'string',
          root.default,
          '',
          getByPath(path, values),
        ),
        key,
        path,
      }
    case 'integer':
    case 'number':
      return {
        type: 'number' as const,
        subSet: root.type === 'integer' ? 'integer' : 'number',
        required: isSelfRequired,
        title: getTitle(key, root.title),
        description: root.description,
        defaultValue: getDefault(
          typeof root.default === 'number',
          root.default,
          0,
          getByPath(path, values),
        ),
        key,
        path,
      }
    case 'boolean':
      return {
        type: 'switcher' as const,
        required: isSelfRequired,
        title: getTitle(key, root.title),
        description: root.description,
        defaultValue: getDefault(
          typeof root.default === 'boolean',
          root.default,
          false,
          getByPath(path, values),
        ),
        key,
        path,
      }
    case 'object':
      if (isNil(root.properties)) {
        return {
          type: 'pairs',
          required: isSelfRequired,
          title: getTitle(key, root.title),
          description: root.description,
          defaultValue: getDefault(
            !isNil(root.default) && Object.keys(root.default).length > 0,
            root.default,
            [],
            getByPath(path, values),
          ),
          key,
          path,
        }
      }

      return Object.entries(root.properties)
        .flatMap(([key, config]) =>
          generateFormFields(config, [...path, key], requiredSet.has(key), values),
        )
        .filter(Boolean) as Field[]
    case 'array': {
      // TODO: cover boolean and array cases
      if (isNil(root.items) || typeof root.items === 'boolean' || Array.isArray(root.items))
        return null

      const structure = generateFormFields(root.items, [], false)
      if (isNil(structure)) return null

      return {
        type: 'list' as const,
        required: isSelfRequired,
        title: getTitle(key, root.title),
        description: root.description,
        structure,
        defaultValue: getDefault(
          Array.isArray(root.default),
          root.default,
          [],
          getByPath(path, values),
        ),
        key,
        path,
      }
    }
  }

  return null
}

const fieldsFromSchema = (schema: SchemaFile, values: ValuesFile): Fields => {
  const fields = generateFormFields(schema, [], false, values)
  // TODO: cover with errors
  if (isNil(fields) || !Array.isArray(fields)) {
    throw new Error()
  }

  const helper = (root: any, path: string[], stack: any[]) => {
    for (const key in root) {
      if (typeof root[key] === 'object' && Object.keys(root[key]).length > 0) {
        helper(root[key], [...path, key], stack)
      } else {
        stack.push([...path, key].join('.'))
      }
    }

    return stack
  }

  return fields
}

export const formStructureFromSchema = (schema: JSONSchema, values: ValuesFile): FormStructure => ({
  fields: fieldsFromSchema(schema, values),
})
