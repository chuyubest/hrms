import request from '@/utils/request'
// 员工相关请求接口

//获取员工的简单列表
export  function getEmployeeSimple(){
    return request({
        url:'/sys/user/simple'
    })
}

//获取员工列表数据 综合列表
export function getEmployeesList(params){
    return request({
        url:'/sys/user',
        params
    })
}

//删除员工
export function delEmployee(id){
    return request({
        url:`/sys/user/${id}`,
        method:'delete'
    })
}

//新增员工接口
export function addEmployee(data){
    return request({
        url:'/sys/user',
        method:'post'
    })
}

//批量导入员工接口
export function importEmployee(data){
    return request({
        utl:'/sys/user/batch',
        method:'post',
        data
    })
}

//保存个人基本信息
export function saveUserDetailById(data){
    return request({
        url:`/sys/user/${data.id}`,
        method:'put',
        data
    })
}

/** *
 *  读取用户详情的基础信息
 * **/
 export function getPersonalDetail(id) {
    return request({
      url: `/employees/${id}/personalInfo`
    })
  }
  
  /** *
   *  更新用户详情的基础信息
   * **/
  export function updatePersonal(data) {
    return request({
      url: `/employees/${data.userId}/personalInfo`,
      method: 'put',
      data
    })
  }
  
  
  /** **
   * 获取用户的岗位信息
   *
   * ****/
  export function getJobDetail(id) {
    return request({
      url: `/employees/${id}/jobs`
    })
  }
  
  
  /**
   * 保存岗位信息
   * ****/
  export function updateJob(data) {
    return request({
      url: `/employees/${data.userId}/jobs`,
      method: 'put',
      data
    })
  }
  //给用户分配角色 需要携带角色信息和用户id
  export function assignRoles(data){
    return request({
      url:'/sys/role/assignPrem',
      methods:'put',
      data
    })
  }



  
