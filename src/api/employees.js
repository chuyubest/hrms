import request from '@/utils/request'
// 员工相关请求接口

//获取员工的简单列表
export  function getEmployeeSimple(){
    return request({
        url:'/sys/user/simple'
    })
}

//获取员工列表数据 综合列表
export function getEmployeesList(params){
    return request({
        url:'/sys/user',
        params
    })
}

//删除员工
export function delEmployee(id){
    return request({
        url:`/sys/user/${id}`,
        method:'delete'
    })
}

//新增员工接口
export function addEmployee(data){
    return request({
        url:'/sys/user',
        method:'post'
    })
}

//批量导入员工接口
export function importEmployee(data){
    return request({
        utl:'/sys/user/batch',
        method:'post',
        data
    })
}
