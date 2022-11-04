//负责全局所有自定义组件的注册
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import ScreenFull from './ScreenFull'
import ThemePicker from './ThemePicker'
export default {
    install(Vue){
        Vue.component('PageTools',PageTools)
        Vue.component('UploadExcel',UploadExcel)
        Vue.component('ImageUpload',ImageUpload)
        Vue.component('ScreenFull',ScreenFull)
        Vue.component('ThemePicker',ThemePicker)
    }
}