<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 -->
      <el-card class="tree-card">
        <!-- 放置头部内容 -->
        <TreeTools :treeNode="company" :isRoot='true'/>
        <!-- 放置一个el-tree -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入内容 插槽内容 会循环多次 有多少节点就循环多少次-->
          <!-- 作用域插槽 slot-scope  接收传递给插槽的数据 data就是每个节点的数据对象-->
        <TreeTools slot-scope="{data}" :treeNode="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
export default {
  components:{
    TreeTools
  },
  data() {
    return {
      company:{name:'传智播客',manager:'负责人'},
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