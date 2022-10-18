/// <reference types="vite/client" />

declare const __NAVIG8_LIGHT_THEME_PATH__: string

interface ImportMetaEnv {
  readonly NAVIG8_REPO_URL: string
  readonly NAVIG8_REPO_ENTRY: string
  readonly NAVIG8_REPO_NAME: string
  readonly NAVIG8_PREDEFINED_NAMESPACE?: string
  readonly NAVIG8_CORS_PROXY_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
