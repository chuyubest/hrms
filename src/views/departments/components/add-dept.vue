<template>
  <!-- 放置弹层组件 -->
  <el-dialog title="新增部门" :visible="showDialog" width="width">
    <!-- 表单数据 label-width设置所有标题宽度-->
    <!-- 匿名插槽 -->
    <el-form label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.name"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.code"
        />
      </el-form-item>
      <!-- native修饰符可以找到原生元素的事件 -->
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 80%"
          placeholder="请选择"
          v-model="formData.manager"
          @focus="getEmployeeSimple"
        >
        <el-option :label="person.name" :value="person.username" v-for="(person,index) in peoples" :key="person.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
          v-model="formData.introduce"
        />
      </el-form-item>
    </el-form>
    <!-- 确定和取消 -->
    <el-row type="flex" justify="center" slot="footer">
      <el-col :span="6">
        <el-button size="small">取消</el-button>
        <el-button type="primary" size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartmentsList } from '@/api/departments';
import {getEmployeeSimple} from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    // 当前节点的数据
    treeNode:{
        type:Object,
        default:null
    }
  },
  data() {
    //检查部门名称是否重复
    const checkNameRepeat = async(rule,value,callback)=>{
        //value是部门名称 要去和同级部门下的部门去比较 有相同的 不让过 不相同可以过
        // 获取最新组织架构的数据
        const {depts} =  await getDepartmentsList()
        //去找同级部门下 有没有和value相同的数据
        //先找到所有子部门 然后再找有没有相同的名称
        const isRepeat = depts.filter(item=>item.pid===this.treeNode.id).some(item.name===value)
        //如果isRepeat为true表示找到了同样的名字
        isRepeat ? callback(new Error(`同级部门下已经存在${value}部门`)):callback()
    }
    const checkCodeRepeat = async(rule,value,callback)=>{
        const {depts} =  await getDepartmentsList()
        //要求编码和所有的部门编码都不能重复
        const isRepeat = depts.some(item => item.code === value && value)
        isRepeat ? callback(new Error(`组织架构下已经存在这个${value}编码了`)):callback()
    }
    return {
      // 定义表单数据
      formData: {
        name: "", // 部门名称
        code: "", // 部门编码
        manager: "", // 部门管理者
        introduce: "", // 部门介绍
      },
       rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          {trigger:'blur',validator:checkNameRepeat}
          ],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          {trigger:'blur',validator:checkCodeRepeat}],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      },
      peoples:[],//负责人列表
    };
  },
  methods:{
    async getEmployeeSimple(){
      this.peoples =  await getEmployeeSimple()

    }
  }
};
</script>
<style>
</style>