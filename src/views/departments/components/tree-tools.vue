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
          <el-dropdown>
            <!-- 内容 -->
            <span>操作 <i class="el-icon-arrow-down"></i></span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <div v-if="!isRoot">
                <el-dropdown-item>编辑部门</el-dropdown-item>
                <el-dropdown-item>删除部门</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
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
};
</script>

<style>
</style>