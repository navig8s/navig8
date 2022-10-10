import { defineStore } from 'pinia'
import { useRequest } from '@/httpRequest/useRequest'
import yaml from 'js-yaml'
import untar, { FileResponse as ArchiveFile } from 'js-untar'
import pako from 'pako'
import { isNil, pipe, prop } from 'ramda'
import { UsefulChartFiles, JSONSchema, chartDecoder } from '@/model/Repo'
import { throwInline } from '@/utils/error'
import { entryManifestDecoder, repoManifestDecoder } from '@/model/Repo'
import { corsProxyRequest } from '@/httpRequest/corsProxyRequest'
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
import { computed } from 'vue'

// TODO this values should become env variables
export const ENTRY = 'k10'
export const REPO = 'https://charts.kasten.io/'

const getRepoManifest = (url: string) =>
  corsProxyRequest(url.replace(/\/$/, '') + '/index.yaml')
    .then((response) => response.text())
    .then((raw) => yaml.load(raw, { filename: 'index.yaml', json: true }))
    .then(
      decodeWith(
        repoManifestDecoder(ENTRY),
        (message, decoder) => new RepoManifestStructureInvalidError(message, decoder as any) as any,
      ),
    )
    .then((manifest) => manifest.entries[ENTRY][0])
    .then(
      decodeWith(
        entryManifestDecoder,
        (message, decoder) => new EntryManifestStructureInvalidError(message, decoder),
      ),
    )

const findUsefulFilesInArchive = async (files: ArchiveFile[]): Promise<UsefulChartFiles> => {
  const find = <
    A extends 'json' | 'string' | 'yaml',
    RT extends A extends 'string' ? string : Record<string, any>,
    R extends N extends true ? RT : RT | undefined,
    N extends boolean = false,
  >(
    variants: string[],
    readAs: A,
    notFoundErrorGetter?: () => Error,
  ): R => {
    const file = files.find((file) =>
      variants.some((name) => `${ENTRY}/${name}`.toLowerCase() === file.name.toLowerCase()),
    )

    isNil(file) && !isNil(notFoundErrorGetter) && throwInline(notFoundErrorGetter())

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
    schema: find(['values.schema.json'], 'json', () => new SchemaNotFoundError()) as JSONSchema,
    values: find(['values.yaml', 'values.yml'], 'yaml', () => new ValuesNotFoundError()),
    chart: await pipe(
      () => find(['Chart.yaml', 'Chart.yml'], 'yaml', () => new ChartManifestNotFoundError()),
      decodeWith(
        chartDecoder,
        (message, decoder) => new ChartManifestStructureInvalidError(message, decoder),
      ),
    )(),
  }
}

const fetchUsefulChartFiles = () =>
  getRepoManifest(REPO)
    .then((entryManifest) => corsProxyRequest(entryManifest.urls[0]))
    .then((res) => res.arrayBuffer())
    .then(pako.inflate) // Decompress gzip using pako
    .then(prop('buffer')) // Get ArrayBuffer from the Uint8Array pako returns
    .then(untar)
    .then(findUsefulFilesInArchive)

export const useRepoStore = defineStore('repo', () => {
  const { data: usefulChartFiles, request: requestChartFiles } = useRequest<
    void,
    Error,
    UsefulChartFiles
  >(fetchUsefulChartFiles)

  const chartMeta = computed(() => usefulChartFiles.value.map(prop('chart')))
  const readme = computed(() => usefulChartFiles.value.map(({ readme }) => readme))

  return { usefulChartFiles, requestChartFiles, chartMeta, readme }
})
