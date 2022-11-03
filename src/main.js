import Vue from 'vue'
import Components from './components'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import Print from 'vue-print-nb'
import * as directives from '@/directives'
import '@/icons' // icon
import '@/permission' // permission control
import checkPermission from '@/mixin/checkPermission'
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.use(Components)
Vue.use(Print) //注册打印组件
Vue.config.productionTip = false

Object.keys(directives).forEach(key =>{
  Vue.directive(key,directives[key]) //注册自定义指令
})

import * as filters from '@/filters'  //fliters是一个对象 里面有很多的函数
Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key]) //注册过滤器
})


// 全局混入检查对象
Vue.mixin(checkPermission) //表示所有组件都拥有了一个检查方法

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
