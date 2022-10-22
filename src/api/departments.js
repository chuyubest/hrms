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