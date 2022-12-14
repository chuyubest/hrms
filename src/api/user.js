import request from '@/utils/request'


export function login(data) {
 //返回一个promise对象
 return request({
    url:'/sys/login',
    method:'post',
    data
 })
}
// 获取用户资料接口
export function getUserInfo() {
  return request({
      url:'/sys/profile',
      method:'post',
  })
}
//根据用户id获取用户详情 可获得头像
export function getUserDetailById(id){
   return request({
      url:`/sys/user/${id}`
   })
}
//用户退出
export function logout() {
  
}
