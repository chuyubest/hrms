<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 左边内容 -->
          <el-tab-pane label="角色管理">
            <el-row style="height: 60px">
              <el-button type="primary" icon="el-icon-plus" size="small" @click="showDialog = true"
                >新增角色</el-button
              >
            </el-row>
            <!-- data数据源 prop表示每列要显示的字段 -->
            <el-table :data="list" style="width: 100%" border>
              <el-table-column
                label="序号"
                width="120px"
                type="index"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="角色名"
                sortable
                width="width"
              ></el-table-column>
              <el-table-column
                prop="description"
                label="描述"
                sortable
                width="width"
              ></el-table-column>
              <el-table-column
                prop="prop"
                label="操作"
                width="width"
                align="center"
              >
                <template slot-scope="{ row, $index }">
                  <div>
                    <el-button type="success" size="small" @click="assignPermission(row.id)" >分配权限</el-button>
                    <el-button
                      type="primary"
                      size="small"
                      @click="editRole(row.id)"
                      >编辑</el-button
                    >
                    <el-button
                      type="danger"
                      size="small"
                      @click="delRoleById(row)"
                      >删除</el-button
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <el-pagination
                layout="prev, pager, next"
                :current-page="page.page"
                :total="page.total"
                :page-size="page.pagesize"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </el-row>
          </el-tab-pane>
          <!-- 右边内容 -->
          <el-tab-pane label="公司信息" name="name">
            <el-alert
              title="对公司名称,公司地址,营业执照的更新,将使得公司资料被重新审核,请谨慎修改!"
              type="warning"
              :closable="false"
              show-icon
            >
            </el-alert>
            <!-- 并不是所有表单都需要model rules -->
            <el-form label-width="100px" style="margin-top: 30px">
              <el-form-item label="企业名称">
                <el-input
                  style="width: 60%"
                  disabled
                  v-model="formData.name"
                ></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  style="width: 60%"
                  disabled
                  v-model="formData.companyAddress"
                ></el-input>
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input
                  style="width: 60%"
                  disabled
                  v-model="formData.companyPhone"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  style="width: 60%"
                  disabled
                  v-model="formData.mailbox"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  style="width: 60%"
                  disabled
                  type="textarea"
                  rows="3"
                  v-model="formData.remarks"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- close事件在点击确定的时候会触发 -->
    <el-dialog
      :title="title"
      :visible="showDialog"
      @close="btnCancel"
    >
      <el-form label-width="120px"  ref="roleForm"  :model="roleForm" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
      </el-row>
    </el-dialog>
    <!-- 放置分配权限弹层 -->
    <el-dialog title="分配权限" :visible='showPermDialog' @close="btnPermCancel">
      <!-- 权限是一个树形结构 -->
       <!-- check-strictly父子勾选是否互相关联 -->
      <el-tree :data="permData" :props="defaultProps" 
      default-expand-all 
      :show-checkbox="true"
      :check-strictly="true"
      node-key="id"
      :default-checked-keys="permIds"
      ref="permTree"
      >
      </el-tree>
      <el-row type="flex" justify="center" slot="footer">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnPermOk">确定</el-button>
          <el-button  size="small" @click="btnPermCancel" >取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  getCompanyInfoById,
  delRoleById,
  getRoleDetailById,
  updateRole,
  addRole,
} from "@/api/setting";
import {getPermissionList,assignPerm} from '@/api/permission'
import { mapGetters } from "vuex";
import {transListToTreeData} from '@/utils/index'
export default {
  data() {
    return {
      page: {
        page: 1, //当前第几页
        pagesize: 3, //每页展示多少条数据
        total: 0, //记录总条数
      },
      list: [], //存放角色列表
      formData: {
        //公司信息
      },
      showDialog: false, //控制弹层的显示
      roleForm: {
        name: "",
        description: "",
      },
      rules: {
        name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
      },
      showPermDialog:false,//控制分配权限弹层的显示
      permData:[],//权限点数据
      defaultProps:{
        label:'name',
        children:'children'
      },
      roleId:null,//记录给哪个角色分配权限
      permIds:[],//当前角色的权限点
    };
  },
  computed: {
    ...mapGetters(["companyId"]),
    title(){
      return this.roleForm.id?'编辑角色':'新增角色'
    }
  },
  created() {
    this.getRoleList();
    this.getCompanyInfoById();
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page);
      (this.page.total = total), (this.list = rows);
      console.log(rows);
    },
    //页码切换的回调事件
    handleCurrentChange(currentPage) {
      //currentPage是当前点击的页码
      this.page.page = currentPage;
      //获取最新数据
      this.getRoleList();
    },
    //获取id
    async getCompanyInfoById() {
      this.formData = await getCompanyInfoById(this.companyId);
    },
    //根据id删除角色
    async delRoleById(row) {
      try {
        await this.$confirm("您是否确定要删除该角色?");
        //只有点击了确定才能进入下方
        await delRoleById(row.id); //调用删除接口
        this.$message.success("删除角色成功");
        this.getRoleList();
      } catch (error) {
        console.log(error);
      }
    },
    //编辑角色按钮 先获取当前角色详情
    async editRole(id) {
      this.roleForm = await getRoleDetailById(id); //实现数据的回写
      //点击编辑角色显示弹层
      this.showDialog = true;
    },
    //点击确定按钮 更新角色或新增
    async btnOk() {
      //先进行表单校验 不加回调函数返回一个promise
      try {
        await this.$refs.roleForm.validate();//只有校验通过才会执行下方代码
           //如果有id 调用编辑接口
        if (this.roleForm.id) {
          await updateRole(this.roleForm);
        }else{
          //新增角色
          await addRole(this.roleForm)

        }
        //重新获取数据
        this.getRoleList()
        this.$message.success('操作成功!')
        //成功之后 关闭弹层会触发el-dialog的close事件
        this.showDialog = false
      } catch(error) {
        console.log(error);
      }
    },
    //
    btnCancel() {
      
       //清除校验规则
      this.$refs.roleForm.resetFields()
      //关闭弹层
      this.showDialog = false
     //清空数据
      this.roleForm = {
        name:'',
        description:''
      }
    },
    //分配权限按钮
    async assignPermission(id){
      //获取权限点数据
      //并将数据转化为树形结构
      this.permData = transListToTreeData(await getPermissionList(),'0')
      //把id存起来 
      this.roleId = id
      //获取该角色的当前权限
      const {permIds} = await getRoleDetailById(id)
      this.permIds = permIds
      this.showPermDialog = true
    },
    //点击确定按钮分配权限
    async btnPermOk(){
      //获取当前所有选中的节点
      //调用接口
      await assignPerm({id:this.roleId,permIds: this.$refs.permTree.getCheckedKeys()})
      //提示用户
      this.$message.success('分配权限成功')
      this.showPermDialog = false
    },
    btnPermCancel(){
      //重置数据
      this.permIds = []
      this.showPermDialog = false
    }
  },
};
</script>

<style>
</style>