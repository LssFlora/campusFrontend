import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import ElementUI from 'element-ui'

Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'
import "./style/style/theme/index.css";


Vue.config.productionTip = false
const OSS = require("ali-oss");

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    // 全局事件总线
    // $bus
    Vue.prototype.$bus = this
  }
}).$mount('#app')
