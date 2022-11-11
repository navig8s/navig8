import { BASE_URL } from '@/environment'

window.__dynamicImportHandler__ = function (importer: string) {
  return BASE_URL + importer
}
window.__dynamicImportPreload__ = function (preloads: string[]) {
  return preloads.map((preload) => BASE_URL + preload)
}
