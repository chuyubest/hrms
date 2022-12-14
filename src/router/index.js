import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// 引入多个模块的规则
import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'
//静态路由 所有用户都可以访问的
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    },

    
  ]
  },
  {
    path:'/import',
    component:Layout,
    //不显示在左侧菜单中
    hidden:true,
    children:[
      {
        path:'',//表示默认的二级路由
        component:()=>import('@/views/import')
      }
    ]
  },
  

  // 404 page must be placed at the end !!!
  
]
// 定义一个动态路由变量
export const asyncRoutes = [
  approvalsRouter,
  departmentsRouter,
  employeesRouter,
  permissionRouter,
  attendancesRouter,
  salarysRouter,
  settingRouter,
  socialRouter
]
const createRouter = () => new Router({
  mode: 'history', // require service support
  base:'hr/',//默认的前缀地址
  scrollBehavior: () => ({ y: 0 }),//管理滚动行为 如果出现滚动 切换就让页面回到顶部
  routes:  [...constantRoutes]
})

const router = createRouter() //实例化一个路由


// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
