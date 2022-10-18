import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// @ts-ignore
import { ViteEjsPlugin } from 'vite-plugin-ejs'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    ViteEjsPlugin((config) => ({
      title: config.env.NAVIG8_SEO_TITLE,
      favicon: config.env.NAVIG8_FAVICON,
      metas: JSON.parse(config.env.NAVIG8_METAS ?? []),
      links: JSON.parse(config.env.NAVIG8_LINKS ?? []),
    })),
  ],
  envPrefix: 'NAVIG8_',
})
