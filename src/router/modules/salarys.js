//导出工资的路由规则
import Layout from '@/layout'
export default {
    path:'/salarys',
    name:'salarys',//给模块一级路由添加name属性 后面做权限管理的时候应用
    component:Layout,
    children:[{
        //二级路由的page不写表示二级路由的默认路由
        path:'',//这里不写表示 /employees不但有布局组件还有员工主页
        component:()=>import('@/views/salarys'),
        //路由元信息
        meta:{
            title:'工资',//左侧导航读取了这里的title属性
            icon:'money'
        }
    }]
}