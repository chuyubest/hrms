<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 -->
      <el-card class="tree-card">
        <!-- 放置头部内容 -->
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px"
        >
          <el-col>
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col>
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <el-col :span="4">
                <!-- 下拉菜单 -->
                <el-dropdown>
                  <!-- 内容 -->
                  <span>操作 <i class="el-icon-arrow-down"></i></span>
                  <!-- 具名插槽 -->
                  <el-dropdown-menu slot="dropdown">
                    <!-- 下拉选项 -->
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 放置一个el-tree -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入内容 插槽内容 会循环多次 有多少节点就循环多少次-->
          <!-- 作用域插槽 slot-scope  接收传递给插槽的数据 data就是每个节点的数据对象-->
           <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px;width:100%" 
          slot-scope="{  data }"
        >
          <el-col>
            <span>{{data.name}}</span>
          </el-col>
          <el-col>
            <el-row type="flex" justify="end">
              <el-col>{{data.manager}}</el-col>
              <el-col :span="4">
                <!-- 下拉菜单 -->
                <el-dropdown>
                  <!-- 内容 -->
                  <span>操作 <i class="el-icon-arrow-down"></i></span>
                  <!-- 具名插槽 -->
                  <el-dropdown-menu slot="dropdown">
                    <!-- 下拉选项 -->
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                    <el-dropdown-item>编辑部门</el-dropdown-item>
                    <el-dropdown-item>删除部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departs: [
        { name: "总裁办", manager:'曹操',children: [{ name: "董事会",manager:'曹丕', }] },
        { name: "行政部",manager:'刘备', },
        { name: "人事部" ,manager:'孙权',},
      ],
      defaultProps: {
        label: "name",//表示从这个属性展示内容
        children:'children',//表示从这里属性查找子节点
      },
    };
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>