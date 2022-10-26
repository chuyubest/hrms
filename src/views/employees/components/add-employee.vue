<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form
      label-width="120px"
      :model="formData"
      :rules="rules"
      ref="addEmployee"
    >
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
          <el-option
            :label="item.value"
            :value="item.id"
            v-for="(item, index) in EmployeeEnum.hireType"
            :key="item.id"
          ></el-option>
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
        <el-input
          placeholder="请选择"
          style="width: 50%"
          v-model="formData.departmentName"
          @focus="getDepartmentsList"
        >
        </el-input>
        <el-tree
          :data="treeData"
          :props="defaultProps"
          :default-expand-all="true"
          v-if="showTree"
          v-loading="loading"
          @node-click="selectNOde"
        >
        </el-tree>
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
      <el-button size="small" @click="btnCancel">取消</el-button>
      <el-button type="primary" size="small" @click="btnOk">确定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import {getDepartmentsList} from '@/api/departments'
import {transListToTreeData} from '@/utils/index'
import EmployeeEnum from '@/api/constant/employees'
import { addEmployee } from '@/api/employees';
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
     EmployeeEnum,
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
        treeData:[],
        defaultProps:{
            label:'name',
            children:'children'
        },
        showTree:false,//默认不显示
        loading:false,//加上一个进度条
    };
  },
  methods:{
    async getDepartmentsList(){
        this.loading = true
       const {depts} =  await getDepartmentsList()
    //    depts是一个数组 需要转化成树形结构才可以被el-tree显示
    //需要定义一个数组来
       this.treeData =  transListToTreeData(depts,'')
       this.loading = false
       //显示tree组件
       this.showTree = true
       
    },
    //点击节点的事件回调
    selectNOde(node){
        this.formData.departmentName = node.name
        this.showTree = false
    },
    //点击确定按钮的事件回调
    async btnOk(){
        try{
            //先进行表单校验
            await this.$refs.addEmployee.validate()
            //调用接口
            await addEmployee(this.formData)
            //通知父组件更新数据 this.$parent父组件的实例 调用父组件的方法
            this.$parent.getEmployeesList()
            //关闭弹层
            this.$parent.showDialog = false
            //这里不用重置数据 因为关闭弹层出发了close事件 close事件绑定了btnCancel方法
        }catch(error){
            console.log(error);
        }
       
    },
    //取消按钮的回调
    btnCancel(){
        // 关闭弹层
        // this.$parent.showDialog = false
        this.$emit('update:showDialog',false)
        //清除表单的校验规则
        this.$refs.addEmployee.resetFields()
        //重置数据
        this.formData = {
            username: "", //姓名
            mobile: "", //手机号
            formOfEmployment: "", //聘用形式
            workNumber: "", //工号
            departmentName: "", //组织名称
            timeOfEntry: "", //入职时间
            correctionTime: "", //转正事件
        }
    }
  }
};
</script>

<style>
</style>