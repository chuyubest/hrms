<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 左边内容 -->
          <el-tab-pane label="角色管理">
            <el-row style="height: 60px">
              <el-button type="primary" icon="el-icon-plus" size="small"
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
                    <el-button type="success" size="small">分配权限</el-button>
                    <el-button type="primary" size="small">编辑</el-button>
                    <el-button type="danger" size="small">删除</el-button>
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
              <el-pagination layout="prev, pager, next" 
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
            <el-form label-width="100px" style="margin-top: 30px" >
              <el-form-item label="企业名称">
                <el-input style="width: 60%" disabled v-model="formData.name"></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input style="width: 60%" disabled v-model="formData.companyAddress"></el-input>
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input style="width: 60%" disabled v-model="formData.companyPhone"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input style="width: 60%" disabled v-model="formData.mailbox"></el-input>
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
  </div>
</template>

<script>
import {getRoleList,getCompanyInfoById} from '@/api/setting'
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      page:{
        page:1,//当前第几页
        pagesize:3,//每页展示多少条数据
        total:0,//记录总条数
      },
      list:[],//存放角色列表
      formData:{
        //公司信息
      }
    }
  },
  computed:{
    ...mapGetters(['companyId'])
  },
  created(){
    this.getRoleList()
    this.getCompanyInfoById()
  },
  methods:{
    async getRoleList(){
      const {total,rows} =  await getRoleList(this.page)
      this.page.total = total,
      this.list = rows
      console.log(rows);
    },
    //页码切换的回调事件
    handleCurrentChange(currentPage){
      //currentPage是当前点击的页码 
      this.page.page = currentPage
      //获取最新数据
      this.getRoleList()
    },
    //获取id
    async getCompanyInfoById(){
      this.formData = await getCompanyInfoById(this.companyId)
    }
  }
}
</script>

<style>
</style>