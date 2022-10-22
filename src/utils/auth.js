import Cookies from 'js-cookie'

const TokenKey = 'hrms-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const timeKey = 'hrms-timekey' //设置一个独一无二的key
//获取时间戳
export function getTime(){
   return Cookies.get(timeKey)
}
//读取时间戳
export function setTime(){
  Cookies.set(timeKey,Date.now())
}