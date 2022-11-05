import Vue from 'vue'
import Components from './components'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import  VueI18n from 'vue-i18n'
import Cookie from 'js-cookie' // 引入cookie包
import elementEN from 'element-ui/lib/locale/lang/en' // 引入饿了么的英文包
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 引入饿了么的中文包

import en from '@/lang/en'
import zh from '@/lang/zh'

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
// import i18n from '@/lang/index'
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.use(VueI18n)
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
const i18n = new VueI18n({
  locale: Cookie.get('language') || 'zh', // 从cookie中获取语言类型 获取不到就是中文
  messages: {
    en: {
      ...elementEN ,// 将饿了么的英文语言包引入
      ...en //自定义语言包
    },
    zh: {
      ...elementZH, // 将饿了么的中文语言包引入
      ...zh
    }
  }
})
// 设置element为当前的语言
Vue.use(ElementUI, { //此时i18n会根据当前的locale属性寻找对应的显示内容 t方法会去对应语言包寻找对应内容 
  //改变locale的值会切换语言包
  i18n: (key, value) => i18n.t(key, value)
})
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
