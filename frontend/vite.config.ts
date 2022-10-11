import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'NAVIG8_')

  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [vue()],
    envPrefix: 'NAVIG8_',
    define: {
      __NAVIG8_LIGHT_THEME_PATH__:
        'NAVIG8_LIGHT_THEME' in env
          ? JSON.stringify(path.resolve(__dirname, env.NAVIG8_LIGHT_THEME))
          : undefined,
    },
  })
}
