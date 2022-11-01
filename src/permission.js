//权限拦截在路由跳转  全局导航守卫 路由独享守卫 组件内守卫
import router from '@/router' //引入路由实例
import store from '@/store' //引入store实例 也就是this.$store
import nProgress from 'nprogress' //引入进度条
import 'nprogress/nprogress.css' //引入进度条样式
//前置守卫 next必须执行 不执行的话页面无法跳转 next(false)跳转终止 
const whiteList = ['/login','/404'] //不受权限控制的页面
router.beforeEach(async(to,from,next)=>{
  nProgress.start() //开启进度条
  if(store.getters.token){
    //如果有token 要去往登陆界面
    if(to.path === '/login'){
      next('/') //跳到主页
    }else{
      //如果vuex中有用户id表示已经获取了 没有id才需要获取用户资料
      if(!store.getters.userId){
        // async 返回的内容可用await接收
        const {roles} = await store.dispatch('user/getUserInfo')
        //筛选用户的可用的路由 得到动态路由
        const newRoutes = await store.dispatch('permission/filterRoutes',roles.menus)
        console.log(newRoutes);
        //动态路由添加到路由表中 默认的路由表只有静态路由
        router.addRoutes(newRoutes) //必须用next(地址)
        next(to.path)  //相当于跳到对应的地址 相当于多做一次跳转
      }else{
        next()
      }
      
    }
  }else{//没有token
    //是否在白名单
    if(whiteList.indexOf(to.path) !== -1){
      // 表示要去的地址在白名单
      next()
    }else{
      next('/login') 
    }
  }
  nProgress.done() //解决手动切换地址进度条不关闭
})
//后置守卫
router.afterEach((to, from) => {
  nProgress.done() //关闭进度条
});
// 不需要导出 在main.js已经导入
