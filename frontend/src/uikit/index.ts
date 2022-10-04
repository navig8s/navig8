import './styles.css'

import { App, Directive } from 'vue'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'

const directives: Array<[string, Directive]> = [['tooltip', Tooltip]]

export const attach = <A extends App<unknown>>(app: A): A => {
  app.use(PrimeVue)

  directives.forEach(([name, directive]) => app.directive(name, directive))

  return app
}
