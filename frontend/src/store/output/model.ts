import { ArrayValue, Field, Fields, ObjectValue, Value, Values } from '@/store/form/model'
import { isEmpty, isNil, path as getByPath, pipe } from 'ramda'
import { ENTRY, REPO } from '@/store/repo'

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
      return field.value.map(extractValue) as ArrayValue
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
          if (Array.isArray(subField) && isNil(defaultValue[index])) {
            diff.push([
              keyFromPath([...path, index]),
              subField.reduce((acc, objectItem) => {
                acc[objectItem.key] = extractValue(objectItem)
                return acc
              }, {}),
            ])
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
  const addRepo = `helm add repo kasten ${REPO}`
  const installPrefix = `helm install kasten/${ENTRY} --name=${ENTRY}`
  const NEW_LINE = ' \\\n'

  const updates = diff.reduce((acc, [key, value]) => {
    if (typeof value === 'string') {
      return acc + NEW_LINE + '--set-string "' + key + '=' + value.replace(/"/g, '\\$&') + '"'
    }

    if (typeof value === 'object') {
      return acc + NEW_LINE + "--set-json '" + key + '=' + JSON.stringify(value) + "'"
    }

    return acc + NEW_LINE + '--set ' + key + '=' + value
  }, '')

  return [addRepo, installPrefix + updates]
}
