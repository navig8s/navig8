import { ArrayValue, Field, Fields, ObjectValue, Value, Values } from '@/store/form/model'
import { fromPairs, head, isEmpty, isNil, omit, path as getByPath, pipe, uniq, uniqBy } from 'ramda'

type Diff = Array<[string, Nullable<Value>]>

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
  const walk = (field: Field, path: Array<string | number>, diff: Diff) => {
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

        // prettier-ignore
        pipe(
          uniqBy<[string, string], string>(head),
          fromPairs,
          (newValue) => {
            const deletedKeys = omit(Object.keys(newValue), defaultValue)
            const allKeysToCheck = uniq([...Object.keys(newValue), ...Object.keys(deletedKeys)])

            allKeysToCheck.forEach((key) => {
              if (isEmpty(key)) return
              if (defaultValue[key] === newValue[key]) return

              diff.push([keyFromPath([...path, key]), newValue[key] ?? null])
            })
          }
        )(field.value)
        break
      case 'list':
        if (!Array.isArray(defaultValue)) {
          diff.push([keyFromPath(path), extractValue(field)])
          break
        }

        for (let index = 0; index < Math.max(field.value.length, defaultValue.length); index++) {
          const subField = field.value[index]

          if (isNil(subField)) {
            diff.push([keyFromPath([...path, index]), null])
          } else if (Array.isArray(subField)) {
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
        }
    }

    return diff
  }

  return form.flatMap((field) => walk(field, field.path, []))
}

export const NEW_LINE = ' \\\n'

export const generateCommandLines = (
  diff: Diff,
  repoUrl: string,
  predefinedRepoName: string,
  repoEntry: string,
  predefinedNamespace?: string,
): string[] => {
  const addRepo = `helm repo add ${predefinedRepoName} ${repoUrl}`
  const installPrefix =
    `helm install ${predefinedRepoName}/${repoEntry}` + NEW_LINE + `--name=${repoEntry}`

  const createNamespace = isNil(predefinedNamespace)
    ? ''
    : NEW_LINE + "--namespace '" + predefinedNamespace + "'" + NEW_LINE + '--create-namespace'

  const updates = diff.reduce((acc, [key, value]) => {
    if (typeof value === 'string') {
      return acc + NEW_LINE + '--set-string "' + key + '=' + value.replace(/"/g, '\\$&') + '"'
    }
    if (typeof value === 'object' && !isNil(value)) {
      return (
        acc +
        NEW_LINE +
        "--set-json '" +
        key +
        '=' +
        JSON.stringify(value).replace(/'/g, "\\'") +
        "'"
      )
    }

    return acc + NEW_LINE + '--set "' + key + '=' + value + '"'
  }, '')

  return [addRepo, installPrefix + createNamespace + updates]
}
