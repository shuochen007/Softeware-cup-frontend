import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueParticles from 'vue-particles'
import ElementUI from 'element-ui'
import {saveAs} from 'file-saver';

// 加载 element 组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueParticles)
Vue.use({saveAs})
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
