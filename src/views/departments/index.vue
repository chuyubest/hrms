<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 -->
      <el-card class="tree-card">
        <!-- 放置头部内容 -->
        <TreeTools :treeNode="company" :isRoot="true"  @addDepts="addDept" />
        <!-- 放置一个el-tree -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 传入内容 插槽内容 会循环多次 有多少节点就循环多少次-->
          <!-- 作用域插槽 slot-scope  接收传递给插槽的数据 data就是每个节点的数据对象-->
          <TreeTools slot-scope="{ data }" :treeNode="data" @delDepts="getDepartments" @addDepts="addDept"/>
        </el-tree>
      </el-card>
      <AddDept :showDialog = 'showDialog'/>
    </div>
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools";
import AddDept from './components/add-dept.vue'
import {transListToTreeData} from '@/utils/'
// 引入api接口
import { getDepartmentsList } from "@/api/departments";
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: "name", //表示从这个属性展示内容
        children: "children", //表示从这里属性查找子节点
      },
      showDialog:false,
      node:null,//记录当前点击的node节点
    };
  },
  created() {
    //调用自身方法
    this.getDepartments();
  },
  methods: {
    // 获取组织部门数据
    async getDepartments() {
      const result = await getDepartmentsList();
      this.company = { name: result.companyName, manager: "负责人" };
      this.departs = transListToTreeData(result.depts,'')//需要将其转换成树形结构
      console.log(result);
    },
    //监听子组件tree-tools中触发的点击添加子部门的事件
    //node时我们点击的部门
    addDept(node){
      this.showDialog = true
      this.node = node
    }
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