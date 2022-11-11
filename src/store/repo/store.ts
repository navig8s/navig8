import { defineStore } from 'pinia'
import { useRequest } from '@/httpRequest/useRequest'
import yaml from 'js-yaml'
import untar, { FileResponse as ArchiveFile } from 'js-untar'
import pako from 'pako'
import { isNil, pipe, prop } from 'ramda'
import { UsefulChartFiles, JSONSchema, chartDecoder, EntryManifest } from '@/model/Repo'
import { throwInline } from '@/utils/error'
import { entryManifestDecoder, repoManifestDecoder } from '@/model/Repo'
import { request as repoRequest } from './request'
import {
  ChartManifestNotFoundError,
  ChartManifestStructureInvalidError,
  ChartManifestYamlInvalidError,
  EntryManifestStructureInvalidError,
  RepoManifestStructureInvalidError,
  SchemaNotFoundError,
  ValuesNotFoundError,
} from './error'
import { decodeWith } from '@/decoder'
import { readAsJSON, readAsString } from '@/utils/arrayBuffer'
import { computed, ref } from 'vue'
import { REPO_ENTRY } from '@/environment'

const getRepoManifest = () =>
  repoRequest('/index.yaml')
    .then((response) => response.text())
    .then((raw) => yaml.load(raw, { filename: 'index.yaml', json: true }))
    .then(decodeWith(repoManifestDecoder(REPO_ENTRY), RepoManifestStructureInvalidError as any))
    .then((manifest) => manifest.entries[REPO_ENTRY][0])
    .then(decodeWith(entryManifestDecoder, EntryManifestStructureInvalidError))

const findUsefulFilesInArchive = async (files: ArchiveFile[]): Promise<UsefulChartFiles> => {
  const find = <
    A extends 'json' | 'string' | 'yaml',
    RT extends A extends 'string' ? string : Record<string, any>,
    R extends N extends true ? RT : RT | undefined,
    ErrorConstructor extends new () => Error,
    N extends boolean = false,
  >(
    variants: string[],
    readAs: A,
    ErrorConstructor?: ErrorConstructor,
  ): R => {
    const file = files.find((file) =>
      variants.some((name) => `${REPO_ENTRY}/${name}`.toLowerCase() === file.name.toLowerCase()),
    )

    isNil(file) && !isNil(ErrorConstructor) && throwInline(new ErrorConstructor())

    if (!isNil(file) && readAs === 'string') return readAsString(file.buffer) as any
    if (!isNil(file) && readAs === 'yaml') {
      try {
        return yaml.load(readAsString(file.buffer), { filename: variants[0], json: true }) as any
      } catch (e) {
        throw new ChartManifestYamlInvalidError()
      }
    }
    if (!isNil(file) && readAs === 'json') return readAsJSON(file.buffer)

    return undefined as any
  }

  return {
    readme: find(['README.md'], 'string'),
    // TODO: schema won't be required for versions after MCP
    schema: find(['values.schema.json'], 'json', SchemaNotFoundError) as JSONSchema,
    values: find(['values.yaml', 'values.yml'], 'yaml', ValuesNotFoundError),
    chart: await pipe(
      () => find(['Chart.yaml', 'Chart.yml'], 'yaml', ChartManifestNotFoundError),
      decodeWith(chartDecoder, ChartManifestStructureInvalidError),
    )(),
  }
}

export const useRepoStore = defineStore('repo', () => {
  const entryManifest = ref<EntryManifest>()

  const fetchUsefulChartFiles = () =>
    getRepoManifest()
      .then((entryManifestResult) => {
        entryManifest.value = entryManifestResult

        return repoRequest(new URL(entryManifestResult.urls[0]).pathname)
      })
      .then((res) => res.arrayBuffer())
      .then(pako.inflate) // Decompress gzip using pako
      .then(prop('buffer')) // Get ArrayBuffer from the Uint8Array pako returns
      .then(untar)
      .then(findUsefulFilesInArchive)

  const { data: usefulChartFiles, request: requestChartFiles } = useRequest<
    void,
    Error,
    UsefulChartFiles
  >(fetchUsefulChartFiles)

  const chartMeta = computed(() => usefulChartFiles.value.map(prop('chart')))
  const readme = computed(() => usefulChartFiles.value.map(({ readme }) => readme))

  return { usefulChartFiles, requestChartFiles, chartMeta, readme, entryManifest }
})
