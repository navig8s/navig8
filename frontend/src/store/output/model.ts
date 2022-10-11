import { ArrayValue, Field, Fields, ObjectValue, Value, Values } from '@/store/form/model'
import { isEmpty, isNil, path as getByPath, pipe } from 'ramda'
import { REPO_ENTRY, REPO_URL } from '@/environment'

type Diff = Array<[string, Value]>

const escapeSpecialSymbols = (value: string) => value.replace(/[.[,=]/g, '\\$&')

const keyFromPath = (path: Array<string | number>) =>
  path.reduce((acc: string, fragment, index) => {
    if (typeof fragment === 'string') {
      return acc + (index === 0 ? '' : '.') + escapeSpecialSymbols(fragment)
    }

    return acc + `[${fragment}]`
  }, '')

const extractValue = (field: Field): Value => {
  switch (field.type) {
    case 'number':
    case 'text':
    case 'select':
    case 'switcher':
      return field.value
    case 'pairs':
      return field.value.reduce((acc: ObjectValue, [key, value]) => {
        acc[key] = value
        return acc
      }, {})
    case 'list':
      return field.value.map((item) =>
        Array.isArray(item) ? item.map(extractValue) : extractValue(item),
      ) as ArrayValue
  }
}

export const extractDiffFromForm = (form: Fields, defaults: Values) => {
  const walk = (field: Field, path: Array<string | number>, diff: Array<[string, Value]>) => {
    const defaultValue = getByPath<Value>(path, defaults)

    if (isNil(defaultValue)) {
      diff.push([keyFromPath(path), extractValue(field)])
      return diff
    }

    switch (field.type) {
      case 'text':
      case 'select':
      case 'number':
      case 'switcher':
        if (defaultValue !== field.value) {
          diff.push([keyFromPath(path), field.value])
        }
        break
      case 'pairs':
        if (typeof defaultValue !== 'object' || Array.isArray(defaultValue)) {
          diff.push([keyFromPath(path), extractValue(field)])
          break
        }

        pipe(
          () => new Map(field.value), // Deduplicate keys
          (map) =>
            map.forEach((value, key) => {
              if (isEmpty(key)) return
              if (key in defaultValue && defaultValue[key] === value) return

              diff.push([keyFromPath([...path, key]), value])
            }),
        )()
        break
      case 'list':
        if (!Array.isArray(defaultValue)) {
          diff.push([keyFromPath(path), extractValue(field)])
          break
        }

        field.value.forEach((subField, index) => {
          if (Array.isArray(subField)) {
            if (isNil(defaultValue[index])) {
              diff.push([
                keyFromPath([...path, index]),
                subField.reduce((acc, objectItem) => {
                  // @ts-ignore
                  acc[objectItem.key] = extractValue(objectItem)
                  return acc
                }, {}),
              ])
            }
          } else {
            walk(subField, [...path, index], diff)
          }
        })
    }

    return diff
  }

  return form.flatMap((field) => walk(field, field.path, []))
}

export const generateCommands = (diff: Diff): string[] => {
  const addRepo = `helm add repo kasten ${REPO_URL}`
  const installPrefix = `helm install kasten/${REPO_ENTRY} --name=${REPO_ENTRY}`
  const NEW_LINE = ' \\\n'

  const updates = diff.reduce((acc, [key, value]) => {
    switch (typeof value) {
      case 'string':
        return acc + NEW_LINE + '--set-string "' + key + '=' + value.replace(/"/g, '\\$&') + '"'
      case 'object':
        return (
          acc +
          NEW_LINE +
          "--set-json '" +
          key +
          '=' +
          JSON.stringify(value).replace(/'/g, "\\'") +
          "'"
        )
      default:
        return acc + NEW_LINE + '--set "' + key + '=' + value + '"'
    }
  }, '')

  return [addRepo, installPrefix + updates]
}
