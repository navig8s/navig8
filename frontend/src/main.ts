import { createApp } from 'vue'
import Main from './Main.vue'
import { pipe } from 'ramda'
import { attach as attachStore } from './store'
import { attach as attachUIKit } from './uikit'
import { attach as attachDirectives } from './directives'

pipe(createApp, attachStore, attachUIKit, attachDirectives, (_app) => _app.mount('#app'))(Main)
