<template>
   <div class="dashboard-container">
    <div class="app-container">
     <PageTools :showBefore="true">
      <!-- 左侧显示总记录数 -->
        <span slot="before">共166条数据</span>
        <!-- 右侧显示按钮 excel导入 excel导出 新增员工 -->
        <template slot="after">
          <el-button type="success" size="small">导入</el-button>
          <el-button type="danger" size="small">导出</el-button>
          <el-button type="primary" size="small" icon="el-icon-plus">新增员工</el-button>
        </template> 
     </PageTools>
     <el-card>
       <!-- 表格组件 -->
      <el-table border>
        <el-table-column  type="index" label="序号" width="100px"></el-table-column>
        <el-table-column  label="姓名"  sortable></el-table-column>
        <el-table-column  label="手机号"  sortable></el-table-column>
        <el-table-column  label="工号"  sortable></el-table-column>
        <el-table-column  label="聘用形式"  sortable></el-table-column>
        <el-table-column  label="部门"  sortable></el-table-column>
        <el-table-column  label="入职时间"  sortable></el-table-column>
        <el-table-column  label="操作"  fixed="right" width="280">
          <template slot-scope="{row,$index}">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" disabled>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-row type="flex" justify="center" align="middle" style="height:60px">
        <el-pagination
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
      </el-row>
     </el-card>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>