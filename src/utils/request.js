// 引入axios
import axios from 'axios'
//创建实例
const service = axios.create()
//配置请求拦截器
service.interceptors.request.use()
//配置响应拦截器
service.interceptors.response.use()
// 导出axios实例
export default service