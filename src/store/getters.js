const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token:state => state.user.token,
  name:state =>state.user.userInfo.username,//建立对于用户名称的快捷访问
}
export default getters
