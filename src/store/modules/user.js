 //引入token工具函数
 import {getToken,setToken,removeToken} from '@/utils/auth'
 import {login} from '@/api/user'
import { set } from 'nprogress'
 //状态
 const state = {
  //设置token的初始状态
  token:getToken()
}
//修改数据
const mutations={
  //设置token
  setToken(state,token){
    state.token = token
    setToken(token)
  },
  // 移出token
  removeToken(state){
    state.token = null //删除vuex的token
    removeToken() //删除缓存的token
  }
}
//异步请求
const actions = {
  async login(context,data){
    //调用登录接口 实际上就是一个promise
    const result =  await login(data)
    // console.log(result);
    // 修改state
    context.commit('setToken',result)
  }
}
export default {
  namespace:true,
  state,
  mutations,
  actions
}