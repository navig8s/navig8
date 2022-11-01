/// <reference types="vite/client" />

declare const __NAVIG8_LIGHT_THEME_PATH__: string

interface CommonEnv {
  readonly NAVIG8_REPO_URL: string
  readonly NAVIG8_REPO_ENTRY: string
  readonly NAVIG8_REPO_NAME: string
  readonly NAVIG8_PREDEFINED_NAMESPACE?: string
  readonly NAVIG8_DOCUMENTATION_URL?: string
  readonly NAVIG8_CORS_PROXY_URL?: string
  readonly NAVIG8_COPYRIGHT?: string
  readonly NAVIG8_BASE_URL?: string
}

interface ImportMetaEnv extends CommonEnv {
  readonly DEV: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  _env_?: CommonEnv
  __dynamicImportHandler__: (importer: string) => string
  __dynamicImportPreload__: (preloads: string[]) => string[]
}
