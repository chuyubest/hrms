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

import * as directives from '@/directives'
import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.use(Components)
Vue.config.productionTip = false

Object.keys(directives).forEach(key =>{
  Vue.directive(key,directives[key]) //注册自定义指令
})

import * as filters from '@/filters'  //fliters是一个对象 里面有很多的函数
Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key]) //注册过滤器
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
