//对公司角色信息的api进行统一管理
import request from '@/utils/request'
//获取角色列表
export function getRoleList(params){
    return request({
        url:'/sys/role',
        params
    })
}