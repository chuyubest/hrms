//导出员工的路由规则
import Layout from '@/layout'
export default {
    path:'/employees',
    name:'employees',//给模块一级路由添加name属性 后面做权限管理的时候应用
    component:Layout,
    children:[{
        //二级路由的page不写表示二级路由的默认路由
        path:'',//这里不写表示 /employees不但有布局组件还有员工主页
        component:()=>import('@/views/employees'),
        //路由元信息
        meta:{
            title:'员工管理',//左侧导航读取了这里的title属性
            icon:'people'
        },
    },{
        path:'detail/:id',//动态路由参数 添加?表示该参数可传可不传
        component:()=>import('@/views/employees/detail'),
        hidden:true,//表示该内容不在左侧菜单显示
        meta:{
            title:'员工详情'
        }
    }
]
}