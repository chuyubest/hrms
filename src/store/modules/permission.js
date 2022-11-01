//专门处理权限路由的模块
import {constantRoutes,asyncRoutes} from '@/router'
const state = {
    //用户一开始肯定拥有静态路由的权限
    routes:constantRoutes,//路由表 表示当前用户所拥有的所有路由的数组
}
const mutations = {
    //修改routes的mutations
    //newRoues为登录成功需要添加的新路由
    //每次都是在静态路由的基础上加新的路由
    setRoutes(state,newRoutes){
        state.routes = [...constantRoutes,...newRoutes]
    }
}
const actions = {
    //删选权限路由
    //第二个参数 menus['setting','permission','employees']
    filterRoutes(context,menus){
        const newRoutes = []
        asyncRoutes.forEach(item=>{
           if(menus.includes(item.name)){
            newRoutes.push(item)
           }
        })
        context.commit('setRoutes',newRoutes) //提交给mutations 修改state
        return newRoutes //用来添加动态路由
    }
}
export default{
    namespaced:true,
    state,
    mutations,
    actions
}