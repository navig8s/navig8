import { createApp } from 'vue'
import Main from './Main.vue'
import { pipe } from 'ramda'
import { attach as attachStore } from './store'
import { attach as attachUIKit } from './uikit'

pipe(createApp, attachStore, attachUIKit, (_app) => _app.mount('#app'))(Main)
