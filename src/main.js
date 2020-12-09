import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入全局样式
import '../src/styles/global.css'

// 引入vuex
import { store } from '../src/store/storage'

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
