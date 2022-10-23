<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col>
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col :span="4">
          <!-- 下拉菜单 -->
          <el-dropdown @command="handleCommand">
            <!-- 内容 -->
            <span>操作 <i class="el-icon-arrow-down"></i></span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <div v-if="!isRoot">
                <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                <el-dropdown-item command="del">删除部门</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import {deleteDepartment} from '@/api/departments'
export default {
  props: {
    // 定义一个传入的属性 要求对方使用该组件的时候必须传入一个treeNode
    treeNode: {
      required: true,
      type: Object,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  methods:{
    //点击添加编辑删除时候触发
    handleCommand(commond){
      if(commond === 'add'){
        //添加子部门
        // 通知父组件显示弹窗 触发自定义事件 将当前节点的数据传递过去
        this.$emit('addDepts',this.treeNode)
      }else if(commond === 'edit'){
        //编辑部门
        
      }else{
        //删除部门 提示用户是否要删除
        this.$confirm('您确定要删除该组织部门吗?').then(()=>{
          // 调用接口发请求
           return deleteDepartment(this.treeNode.id)
        }).then(()=>{
          //只需要等到成功的时候 通知父组件重新获取数据
          console.log(this.$parent);
          this.$emit('delDepts')
          this.$message.success('删除部门成功')
        })
      }
    }
  }
};
</script>

<style>
</style>