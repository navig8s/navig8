import './style.css'

import { createApp } from 'vue'
import Main from './Main.vue'
import { pipe } from 'ramda'
import { attach as attachStore } from './store'

const app = pipe(createApp, attachStore)(Main)

app.mount('#app')
