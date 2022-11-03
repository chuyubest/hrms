 //引入token工具函数
 import {getToken,setToken,removeToken, getTime, setTime} from '@/utils/auth'
 import {login,getUserInfo,getUserDetailById} from '@/api/user'
 import {resetRouter} from '@/router'
 //状态
 const state = {
  //设置token的初始状态
  token:getToken(),
  userInfo:{} //定义一个空对象
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
  },
  //存储用户信息
  saveUserInfo(state,userInfo){
    state.userInfo = userInfo
  },
  //删除用户信息
  removeUserInfo(state){
    state.userInfo = {}
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
    //拿到token 存储时间戳
    setTime()
  },
  //获取用户信息
  async getUserInfo(context){
    //调用获取用户接口
    const result =  await getUserInfo()
    //获取用户详情
    const baseInfo = await getUserDetailById(result.userId)
    //将两个接口结果进行合并
    const baseResult = {...result,...baseInfo}
    context.commit('saveUserInfo',baseResult)
    return result //为什么要return 后期做权限埋下伏笔
  },
  // 用户退出
  logout(context){
    //删除token
    context.commit('removeToken')
    //删除用户资料
    context.commit('removeUserInfo')
    //重置路由
    resetRouter()
    //将vuex中的权限设置为初始状态
    //vuex子模块怎么调用子模块的action 没加命名空间的话可以随意调用
    //不加的话 mutations和action都是挂载在全局上的所以可以直接调用
    //加了命名空间的context不是全局的context而是当前模块下的
    // 第三个参数是一个对象 {root:true} 调用根级的mutation action
    context.commit('permission/setRoutes',[],{root:true})
  }

}
export default {
  namespaced:true,
  state,
  mutations,
  actions
}