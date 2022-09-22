import { defineStore } from 'pinia'
import { useRequest } from '@/httpRequest/useRequest'
import yaml from 'js-yaml'
import untar, { FileResponse as ArchiveFile } from 'js-untar'
import pako from 'pako'
import { prop } from 'ramda'
import { UsefulChartFiles, JSONSchema } from '@/store/repo/types'
import { throwInline } from '@/utils/error'
import { chartManifestDecoder, repoManifestDecoder } from '@/store/repo/decoders'
import { corsProxyRequest } from '@/httpRequest/corsProxyRequest'
import { FileNotFoundError } from '@/store/repo/errors'

// TODO this values should become env variables
const ENTRY = 'k10'
const REPO = 'https://charts.kasten.io/'

const getRepoManifest = (url: string) =>
  corsProxyRequest(url.replace(/\/$/, '') + '/index.yaml')
    .then((response) => response.text())
    .then((raw) => yaml.load(raw, { filename: 'index.yaml', json: true }))
    .then((manifest) => repoManifestDecoder(ENTRY).decodeToPromise(manifest))
    .then((manifest) => chartManifestDecoder.decodeToPromise(manifest.entries[ENTRY][0]))

const findUsefulFilesInArchive = (files: ArchiveFile[]): UsefulChartFiles => {
  const find = <N extends boolean = false>(name: string, throwOnNotFound?: N) => {
    const file = files.find((file) => name.toLowerCase() === file.name.toLowerCase())

    throwOnNotFound === true && file === undefined && throwInline(new FileNotFoundError(name))

    return file as N extends true ? ArchiveFile : ArchiveFile | undefined
  }

  return {
    readme: find(`${ENTRY}/README.md`)?.readAsString(),
    // TODO: schema will be not required for versions after MCP
    schema: find(`${ENTRY}/values.schema.json`, true).readAsJSON() as JSONSchema,
    values: yaml.load(find(`${ENTRY}/values.yaml`, true).readAsString(), {
      filename: 'values.yaml',
      json: true,
    }) as Record<string, any>,
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
  const { data: usefulChartFiles, request: requestUsefulChartFiles } = useRequest<
    void,
    Error,
    UsefulChartFiles
  >(fetchUsefulChartFiles)

  requestUsefulChartFiles()

  return { usefulChartFiles }
})
