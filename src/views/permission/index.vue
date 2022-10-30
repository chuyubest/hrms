<template>
   <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <PageTools>
        <el-button type="primary" slot="after" size="small">添加权限</el-button>
      </PageTools>
      <!-- 表格 -->
      <el-table border>
        <el-table-column  label="名称"></el-table-column>
        <el-table-column  label="标识"></el-table-column>
        <el-table-column  label="描述"></el-table-column>
        <el-table-column  label="操作">
          <template>
            <el-button type="text">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>