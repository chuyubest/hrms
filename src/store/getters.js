const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token:state => state.user.token,
  name:state =>state.user.userInfo.username,//建立对于用户名称的快捷访问
  userId:state =>state.user.userInfo.userId,//建立对于用户id的快捷访问
  staffPhoto:state => state.user.userInfo.staffPhoto,//建立用户头像的快捷访问
  companyId:state => state.user.userInfo.companyId,//建立公司id的快捷访问
  routes:state=>state.permission.routes  //当前用户可访问的菜单导航
}
export default getters
