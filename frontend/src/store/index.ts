import { App } from 'vue'
import { createPinia } from 'pinia'

export const attach = <T extends App<unknown>>(app: T) => {
  app.use(createPinia())

  return app
}
