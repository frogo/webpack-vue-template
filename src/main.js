import Vue from 'vue'
import QS from 'qs'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'

import ElementUI from 'element-ui'
import axios from '@/request/http'
import VueECharts from 'vue-echarts'

import 'normalize.css/normalize.css'
import 'minireset.css/minireset.css'
import '@/assets/style/common.scss'

import 'element-ui/lib/theme-chalk/index.css'
import './icons'

Vue.component('v-chart', VueECharts)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.QS = QS

new Vue({
  render: function (h) { return h(App) },
  store: store,
  router: router
}).$mount('#app')
