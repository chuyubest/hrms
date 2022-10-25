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
