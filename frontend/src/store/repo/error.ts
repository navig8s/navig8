import { DecodeError } from '@/decoder'
import { ChartManifest, EntryManifest, RepoManifest } from '@/model/Repo'

export class FileNotFoundError extends Error {
  constructor(fileName: string) {
    super(`Required file "${fileName}" was not found in the specified helm chart`)
  }
}
export class SchemaNotFoundError extends FileNotFoundError {
  constructor() {
    super('values.schema.json')
  }
}
export class ValuesNotFoundError extends FileNotFoundError {
  constructor() {
    super('values.yaml')
  }
}
export class ChartManifestNotFoundError extends FileNotFoundError {
  constructor() {
    super('Chart.yaml')
  }
}

export class RepoManifestStructureInvalidError extends DecodeError<RepoManifest<string>> {}
export class EntryManifestStructureInvalidError extends DecodeError<EntryManifest> {}
export class ChartManifestStructureInvalidError extends DecodeError<ChartManifest> {}

export class ChartManifestYamlInvalidError extends Error {
  constructor() {
    super('Chart.yaml file is not valid yaml')
  }
}
