import { App, Directive } from 'vue'
import { scrollShadow } from './scrollShadow'

const directives: Array<[string, Directive]> = [['scroll-shadow', scrollShadow]]

export const attach = <A extends App<unknown>>(app: A): A => {
  directives.forEach(([name, directive]) => app.directive(name, directive))

  return app
}
