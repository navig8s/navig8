import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema'

// Currently helm uses https://github.com/xeipuuv/gojsonschema package that supports draft-04, draft-06 and draft-07 versions
// Helm's go.mod https://github.com/helm/helm/blob/bed23120b048977d67c929cec915e1d6e0887c5d/go.mod#L33
export type JSONSchema = JSONSchema4 | JSONSchema6 | JSONSchema7

export type EntryManifest = {
  apiVersion: string
  created: string // Date ISO
  description: string
  digest: string
  name: string
  urls: string[]
  version: string
}

export type RepoManifest<E extends string> = {
  apiVersion: string
  entries: { [entry in E]: EntryManifest[] }
}

export type ChartFile = {
  name: string
  version: string | number
  kubeVersion?: string | number
  description?: string
}

export type ValuesFile = Record<string, any>
export type ReadmeFile = string
export type SchemaFile = JSONSchema

export type UsefulChartFiles = {
  values: ValuesFile
  readme?: ReadmeFile
  // TODO: make this optional when we will support parsing values.yaml
  schema: SchemaFile
  chart: ChartFile
}
