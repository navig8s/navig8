import { NAVIG8_BASE_URL } from '@/environment'

window.__dynamicImportHandler__ = function (importer: string) {
  return NAVIG8_BASE_URL + importer
}
window.__dynamicImportPreload__ = function (preloads: string[]) {
  return preloads.map((preload) => NAVIG8_BASE_URL + preload)
}
