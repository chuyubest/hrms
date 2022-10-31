<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <PageTools>
        <el-button
          type="primary"
          slot="after"
          size="small"
          @click="addPermission('1', '0')"
          >添加权限</el-button
        >
      </PageTools>
      <!-- 表格 -->
      <!-- 指定id为行的唯一标识 -->
      <el-table border :data="list" row-key="id">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="标识" prop="code"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <!-- 添加按钮只在访问权的层级显示 当type为1才显示添加按钮 -->
            <el-button
              type="text"
              v-if="row.type === 1"
              @click="addPermission('2', row.id)"
              >添加</el-button
            >
            <el-button type="text" @click="editPermission(row.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="delPermission(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增和编辑弹层 -->
    <el-dialog :title="showTitle" :visible.sync="showDialog" width="width" @close="btnCancel">
      <!-- 表单 -->
      <el-form
        label-width="120px"
        :model="formData"
        :rules="rules"
        ref="permissionForm"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code"></el-input>
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description"></el-input>
        </el-form-item>
        <el-form-item label="企业可见">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center" slot="footer">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取 消</el-button>
          <el-button type="primary" size="small" @click="btnOk"
            >确 定</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPermissionList,
  delPermission,
  updatePermission,
  addPermission,
  getPermissionDetail,
} from "@/api/permission";
import { transListToTreeData } from "@/utils/index";
export default {
  data() {
    return {
      showDialog: false,
      list: [], //所有权限
      formData: {
        name: "", // 名称
        code: "", // 标识
        description: "", // 描述
        type: "", // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: "", // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: "0", // 开启
      },
      rules: {
        name: [
          { required: true, message: "权限名称不能为空!", trigger: "blur" },
        ],
        code: [
          { required: true, message: "权限标识不能为空!", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getPermissionList();
  },
  computed:{
    showTitle(){
      return this.formData.id ? '编辑权限':'新增权限'
    }
  },
  methods: {
    async getPermissionList() {
      //将数据转化成了树形数据
      const data = await getPermissionList();
      this.list = transListToTreeData(data, "0");
      console.log(data);
    },
    //删除权限
    async delPermission(id) {
      // 提示用户是否要删
        try {
         await  this.$confirm("是否要删除该权限")
          //根据权限点的id删除权限
          await delPermission(id);
          //重新获取数据
          this.getPermissionList();
          this.$message.success("操作成功!");
        } catch (error) {
          console.log(error);
        }
      }
    },
    //添加权限
    addPermission(type, pid) {
      //需要知道当前添加的哪个级别的权限 访问权 还是操作权
      //pid代表当前权限的父节点id
      this.formData.type = type;
      this.formData.pid = pid;
      this.showDialog = true
    },
    //点击表单确定按钮
    btnOk() {
      //先进行表单校验
      this.$refs.permissionForm.validate(async (valid) => {
        if (valid) {
          //校验通过
          if (this.formData.id) {
            //编辑功能
            await updatePermission(this.formData);
          } else {
            await addPermission(this.formData);
          }
          this.$message.success("操作成功!");
          //获取最新数据
          this.getPermissionList();
          this.showDialog = false
        }
      });
    },
    btnCancel() {
      //重置数据
      this.formData = {
        name: "", // 名称
        code: "", // 标识
        description: "", // 描述
        type: "", // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: "", // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: "0", // 开启
      }
      //清除校验
      this.$refs.permissionForm.resetFields()
      this.showDialog = false
    },
    //编辑权限
    async editPermission(id) {
      //先根据id查询当前权限点详情进行回显
      this.formData = await getPermissionDetail(id);
      this.showDialog = true
    }
  }

</script>

<style>
</style>