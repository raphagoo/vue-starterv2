import Vue from 'vue'
import logger from 'logger'

import App from './App.vue'
import config from 'config'
import { router } from './router'
import { store } from './store'
import api from './interfaces/apiInterface'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

// prevents from display notice about running in dev mode
Vue.config.productionTip = false
// make api and log available everywhere
Vue.prototype.$api = api
Vue.prototype.$log = logger

logger.info('config:', config);
logger.info('main.js VERSION', VERSION); // eslint-disable-line no-undef

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
