<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 放置一个el-card -->
      <el-card>
        <el-tabs>
          <el-tab-pane label="登陆账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
              :model="userInfo"
              :rules="rules"
              ref="userForm"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  style="width: 300px"
                  v-model="userInfo.username"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password2">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="userInfo.password2"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUser">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <!-- 放置内容 -->
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <!-- 放置内容 -->
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from "@/api/user";
import { saveUserDetailById } from "@/api/employees";
export default {
  data() {
    return {
      userId: this.$route.params.id,
      userInfo: {
        username: "",
        password2: "", //密码 因为读取出来的password是密文
      },
      rules: {
        username: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        password2: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 9, message: "密码长度6-9位", trigger: "blur" },
        ],
      },
    }
  },
  created(){
    this.getUserDetailById()
  },
  methods:{
    async getUserDetailById(){
        this.userInfo = await getUserDetailById(this.userId)
    },
    saveUser(){
        //先进行表单校验
        this.$refs.userForm.validate().then(async()=>{
            await saveUserDetailById({...this.userInfo,password:this.userInfo.password2})
            this.$message.success('修改用户信息成功')
            }
        )
    }
  }
};
</script>

<style>
</style>