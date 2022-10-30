<template>
   <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <PageTools>
        <el-button type="primary" slot="after" size="small">添加权限</el-button>
      </PageTools>
      <!-- 表格 -->
      <!-- 指定id为行的唯一标识 -->
      <el-table border :data="list" row-key="id">
        <el-table-column  label="名称" prop="name"></el-table-column>
        <el-table-column  label="标识" prop="code"></el-table-column>
        <el-table-column  label="描述" prop="description"></el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="{row}">
            <!-- 添加按钮只在访问权的层级显示 当type为1才显示添加按钮 -->
            <el-button type="text" v-if="row.type === 1" >添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getPermissionList} from '@/api/permission'
import {transListToTreeData} from '@/utils/index'
export default {
  data(){
    return {
      list:[],//所有权限
    }
  },
  created(){
    this.getPermissionList()
  },
  methods:{
    async getPermissionList(){
      //将数据转化成了树形数据
      this.list = transListToTreeData(await getPermissionList(),'0')  
    }
  }
}
</script>

<style>

</style>