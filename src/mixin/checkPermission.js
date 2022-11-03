import store from '@/store'
//混入对象是组件的选项对象
export default {
    methods: {
        //检查权限 key就是要检查的权限点 在用户信息里面找points如果有key则认为有权限
        checkPermission(key){
            const {userInfo} =  store.state.user
            if(userInfo.roles&&userInfo.roles.points){
               return userInfo.roles.points.some(item=>item === key)
            }
            return false //如果没进入if说明没权限
        }
    },
}