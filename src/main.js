import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import { mixin } from './mixin'

Vue.mixin(mixin)

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
