import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入vuex
import store from './store'

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 使用 lib-flexible 动态设置 REM 基准值（html 标签的字体大小）
import 'amfe-flexible'

// 引入全局样式 放在最后，方便覆盖其他样式
import '../src/styles/global.less'

Vue.use(Vant)

Vue.config.productionTip = false
Vue.config.devtools = true // 允许使用调试工具

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
