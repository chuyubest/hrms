//引入axios的二次封装
import request from '@/utils/request'
// 封装api接口,获取组织架构数据
export function getDepartmentsList(){
    return request({
        url:'/company/department',
        method:'get'
    })
}