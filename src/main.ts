import consoleLogger from './interfaces/consoleLogger'
import config from 'config'
import { router } from './router'
import { store } from './store'
import api from './interfaces/apiInterface'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { createApp } from 'vue'
import App from './App.vue'



const vuetify = createVuetify()

// make api and log available everywhere
const VERSION = '2.1.0'

consoleLogger.info('main.js VERSION', VERSION); // eslint-disable-line no-undef

const app = createApp(App)
app.config.globalProperties.$config = config
app.provide('$api', api)
app.use(router)
app.use(store)
app.use(vuetify)
app.mount('#app')
