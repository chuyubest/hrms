<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <!-- 多选框组 -->
    <el-checkbox-group v-model="roleIds">
      <!-- 要循环的选项 -->
      <!-- label属性既显示又存储  显示角色名称 存储角色id 但是我们让label存储id 用插值显示名称-->
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row type="flex" justify="center" slot="footer">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from "@/api/setting";
import {getUserDetailById} from '@/api/user'
import {assignRoles} from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false,
    },
    userId: {
      //用户的id 当前要给哪个用户分配jues
      type: String,
      default: null,
      required: true, //要求必须传
    },
  },
  data() {
    return {
      roleList: [], //当前所有的角色
      roleIds: [], //负责存储当前用户所拥有的角色id
    };
  },
  created() {
    //获取所有的角色
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 }); //不传参默认只取十条数据  因为角色数量不会太多
      this.roleList = rows;
    },
    //获取当前用户所分配的角色 给父组件调用的
    async getAssignedRoles(id){//props传值是异步的 所以这里不能用this.userId
        const {roleIds} = await getUserDetailById(id)  //将用户所拥有的角色赋值给当前用户对象
        this.roleIds = roleIds
    },
    //点击确定分配角色
    async btnOk(){
        await assignRoles({id:this.userId,roleIds:this.roleIds})
        // 关闭弹层
        this.$emit('update:showRoleDialog',false)
        this.$message.success('分配角色成功!')
    },
    //取消按钮
    btnCancel(){
        //重置数组 
        this.roleIds = []
        this.$emit('update:showRoleDialog',false)
    }
  },
};
</script>

<style>
</style>