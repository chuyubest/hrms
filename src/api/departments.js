//引入axios的二次封装
import request from '@/utils/request'
// 封装api接口,获取组织架构数据
export function getDepartmentsList(){
    return request({
        url:'/company/department',
        method:'get'
    })
}

// 删除部门api
export function deleteDepartment(id){
    return request({
        url:`/company/department/${id}`,
        method:'delete' //接口满足restful接口规范 post新增或者添加业务 put 修改业务
    })
}

//新增部门api
export function addDepartment(data){
    return request({
        url:'/company/department',//遵循restful接口规范 地址一样 method不一样 业务也不一样
        method:'post',
        data
    })
}
//修改部门
export function editDepartment(data){
    return request({
        url:`/company/department/${data.id}`,
        method:'put',
        data
    })
}

//根据id获取部门详情
export function getDepartmentDetail(id){
    return request({
        url:`/company/department/${id}`
    })
}