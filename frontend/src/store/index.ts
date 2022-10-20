import { App } from 'vue'
import { createPinia } from 'pinia'
import { pipe } from 'ramda'
import piniaPersistPlugin from 'pinia-plugin-persistedstate'

export const attach = <T extends App<unknown>>(app: T) =>
  pipe(
    createPinia,
    (pinia) => pinia.use(piniaPersistPlugin),
    (pinia) => app.use(pinia),
  )()
