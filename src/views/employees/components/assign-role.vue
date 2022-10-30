<template>
  <el-dialog title="分配角色" :visible="showRoleDialog">
    <!-- 多选框组 -->
    <el-checkbox-group>
        <!-- 要循环的选项 -->
    </el-checkbox-group>
    <el-row type="flex" justify="center" slot="footer">
        <el-col :span="6">
            <el-button type="primary" size="small">确定</el-button>
            <el-button >取消</el-button>
        </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
    props:{
        showRoleDialog:{
            type:Boolean,
            default:false
        },
        userId:{
            //用户的id 当前要给哪个用户分配jues
            type:String,
            default:null,
            required:true//要求必须传
        }
    }
}
</script>

<style>

</style>