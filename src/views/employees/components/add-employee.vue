<template>
  <el-dialog title="新增员工" :visible="showDialog">
    <!-- 表单 -->
    <el-form label-width="120px">
        <el-form-item label="姓名">
            <el-input style="width:50%" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机">
            <el-input  style="width:50%"  placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item  label="入职时间">
            <el-date-picker  type="date"  style="width:50%"  placeholder="请选择"></el-date-picker>
        </el-form-item>
        <el-form-item label="聘用形式">
            <el-select v-model="model" placeholder="请选择"  style="width:50%">
                
            </el-select>
        </el-form-item>
        <el-form-item  label="工号">
            <el-input  style="width:50%"  placeholder="请输入工号"></el-input>
        </el-form-item>
        <el-form-item  label="部门">
             <el-select v-model="model" placeholder="请选择"  style="width:50%">
                
            </el-select>
        </el-form-item>
        <el-form-item label="转正时间">
            <el-date-picker  type="date"  style="width:50%"  placeholder="请选择转正时间"></el-date-picker>
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
    props:{
        showDialog:{
            type:Boolean,
            default:false
        }
    }
}
</script>

<style>

</style>