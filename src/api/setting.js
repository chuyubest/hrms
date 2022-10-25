//对公司角色信息的api进行统一管理
import request from '@/utils/request'
//获取角色列表
export function getRoleList(params){
    return request({
        url:'/sys/role',
        params
    })
}
//根据id获取企业基本信息
export function getCompanyInfoById(companyId){
    return request({
        url:`/company/${companyId}`
    })
}
//根据id删除角色
export function delRoleById(id){
    return request({
        url:`/sys/role/${id}`,
        method:'delete'
    })
   
}

//根据id修改角色
export function updateRole(data){
    return request({
        url:`/sys/role/${data.id}`,
        method:'put'
    })
}
//根据id获取角色详情
export function getRoleDetailById(id){
    return request({
        url:`/sys/role/${id}`
    })
}
//新增角色
export function addRole(data){
    return request({
        url:'/sys/role',
        method:'post'
    })
}