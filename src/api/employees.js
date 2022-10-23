import request from '@/utils/request'
// 员工相关请求接口

//获取员工的简单列表
export  function getEmployeeSimple(){
    return request({
        url:'/sys/user/simple'
    })
}