
import logger from './interfaces/consoleLogger'
import { router } from './router'
import { store } from './store'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { createApp } from 'vue'
import App from './App.vue'

const vuetify = createVuetify()

const VERSION = '2.1.0'

logger.info('main.js VERSION', VERSION); // eslint-disable-line no-undef

const app = createApp(App)
app.use(router)
app.use(store)
app.use(vuetify)
app.mount('#app')
