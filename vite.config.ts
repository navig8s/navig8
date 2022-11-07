import { defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { useDynamicPublicPath } from 'vite-plugin-dynamic-publicpath'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
/** @type {UserConfig} */
export default ({ mode }) => {
  const isDev = mode === 'development'

  const env = loadEnv(mode, __dirname, 'NAVIG8_')

  return defineConfig({
    ...(isDev && env.NAVIG8_USE_PROXY === 'true'
      ? {
          server: {
            proxy: {
              '^/repo/.*': {
                target: env.NAVIG8_REPO_URL.replace(/\/$/, ''),
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/repo/, ''),
              },
            },
          },
        }
      : {}),
    build: {
      manifest: true,
      rollupOptions: {
        input: path.resolve(__dirname, './src/main.ts'),
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      vue(),
      isDev &&
        ViteEjsPlugin((config) => ({
          JS: 'http://localhost:5173/src/main.ts',
          CSS: undefined,
          NAVIG8_SEO_TITLE: config.env.NAVIG8_SEO_TITLE ?? '',
          NAVIG8_FAVICON: config.env.NAVIG8_FAVICON ?? '',
          NAVIG8_METAS: JSON.parse(config.env.NAVIG8_METAS ?? '[]'),
          NAVIG8_LINKS: JSON.parse(config.env.NAVIG8_LINKS ?? '[]'),
          NAVIG8_TOP_HEAD: config.env.NAVIG8_TOP_HEAD,
          NAVIG8_BOTTOM_HEAD: config.env.NAVIG8_BOTTOM_HEAD,
          NAVIG8_TOP_BODY: config.env.NAVIG8_TOP_BODY,
          NAVIG8_BOTTOM_BODY: config.env.NAVIG8_BOTTOM_BODY,
        })),
      isDev && useDynamicPublicPath(),
    ].filter(Boolean),
    envPrefix: 'NAVIG8_',
  })
}
