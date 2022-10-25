//负责全局所有自定义组件的注册
import PageTools from './PageTools'
export default {
    install(Vue){
        Vue.component('PageTools',PageTools)
    }
}