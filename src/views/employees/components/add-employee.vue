<template>
  <el-dialog title="新增员工" :visible="showDialog">
    <!-- 表单 -->
    <el-form label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input
          style="width: 50%"
          placeholder="请输入姓名"
          v-model="formData.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          style="width: 50%"
          placeholder="请输入手机号"
          v-model="formData.mobile"
        ></el-input>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          type="date"
          style="width: 50%"
          placeholder="请选择"
          v-model="formData.timeOfEntry"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          placeholder="请选择"
          style="width: 50%"
          v-model="formData.formOfEmployment"
        >
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          style="width: 50%"
          placeholder="请输入工号"
          v-model="formData.workNumber"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-select
          placeholder="请选择"
          style="width: 50%"
          v-model="formData.departmentName"
        >
        </el-select>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          type="date"
          style="width: 50%"
          placeholder="请选择转正时间"
          v-model="formData.correctionTime"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center" slot="footer">
      <el-button size="small">取消</el-button>
      <el-button type="primary" size="small">确定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {
        username: "", //姓名
        mobile: "", //手机号
        formOfEmployment: "", //聘用形式
        workNumber: "", //工号
        departmentName: "", //组织名称
        timeOfEntry: "", //入职时间
        correctionTime: "", //转正事件
      },
      rules: {
        username: [
          { required: true, message: "用户姓名不能为空", trigger: "blur" },
          { min: 1, max: 4, message: "用户姓名为1-4位" },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,//正则表达式
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
         formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
    };
  },
};
</script>

<style>
</style>