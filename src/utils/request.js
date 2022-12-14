// 引入axios
import axios from 'axios'
import {
  Message
} from 'element-ui'
import router from '@/router'
//引入store实例
import store from '@/store'
import {
  getTime
} from '@/utils/auth'
//是否超时  当前时间-缓存中的时间是否大于 时间差
const timeOut = 2 //定义超时时间
function checkTimeOut() {
  let currrentTime = Date.now() //当前时间戳
  let saveTime = getTime()
  return (currrentTime - saveTime) / 1000 > timeOut
}
//创建实例
const service = axios.create({
  // 如果执行 npm run dev  值为 /api 正确  /api 这个代理只是给开发环境配置的代理
  // 如果执行 npm run build 值为 /prod-api  没关系  运维应该在上线的时候 给你配置上 /prod-api的代理
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  // baseURL:'/prod-api',
  timeout: 5000 // 定义5秒超时
})
//配置请求拦截器
service.interceptors.request.use(config => {
  //config是请求的配置信息
  //注入token
  if (store.getters.token) {
    //只有在有token的情况下才有必要检查时间戳
    // if(checkTimeOut){//如果它为true 过期了
    //     //token没用了需要移出
    //     store.dispatch('user/logout')
    //     router.push('/login')
    //     return Promise.reject(new Error('token超时了'))
    // }
    config.headers['Authorization'] = 'Bearer ' + store.getters.token
  }
  return config //必须要返回
}, error => {
  return Promise.reject(error)
})
//配置响应拦截器
service.interceptors.response.use(response => {
    // axios默认加了一层data
    const {
      success,
      message,
      data
    } = response.data
    //根据success的成功与否执行下面的操作
    if (success) {
      return data
    } else {
      Message.error(message) //提示错误消息
      return Promise.reject(new Error(message))
    }
  }, error => {
    //error信息里面有response的对象
    if (error && error.response && error.response.data.code === 10002) {
      //当code为10002时表示服务器告诉我们token超时
      store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message) // 提示错误信息
    }
    return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
  }

)

// 导出axios实例
export default service
