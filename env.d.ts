/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ID: string
  readonly VITE_APP_HOST_BASE_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
