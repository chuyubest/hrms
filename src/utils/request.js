// 引入axios
import axios from 'axios'
import { Message } from 'element-ui'
//引入store实例
import store from '@/store'
//创建实例
const service = axios.create({
  // 如果执行 npm run dev  值为 /api 正确  /api 这个代理只是给开发环境配置的代理
  // 如果执行 npm run build 值为 /prod-api  没关系  运维应该在上线的时候 给你配置上 /prod-api的代理
    baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
    // baseURL:'/prod-api',
    timeout: 5000 // 定义5秒超时
})
//配置请求拦截器
service.interceptors.request.use(config=>{
    //config是请求的配置信息
    //注入token
    if(store.getters.token){
        config.headers['Authorization'] = 'Bearer '+store.getters.token
    }
    return config //必须要返回
},error=>{
    return Promise.reject(error)
})
//配置响应拦截器
service.interceptors.response.use(response=>{
    // axios默认加了一层data
    const {success,message,data}  = response.data
    //根据success的成功与否执行下面的操作
    if(success){
        return data
    }else{
        Message.error(message)//提示错误消息
        return Promise.reject(new Error(message))
    }
},error=>{
    Message.error(error.message) // 提示错误信息
     return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
}
 
)
// 导出axios实例
export default service
