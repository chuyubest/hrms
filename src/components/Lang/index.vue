<template>
<!-- 点击菜单项事件 -->
    <!-- 下拉菜单 -->
    <el-dropdown @command="changeLang">
        <div>
            <svg-icon icon-class="language" style="color:#fff;font-size:20px"></svg-icon>
        </div>
        <!-- 下拉图标 -->
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh" :disabled="$i18n.locale==='zh'">中文</el-dropdown-item>
            <el-dropdown-item command="en" :disabled="$i18n.locale==='en'">en</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import Cookie from 'js-cookie'
export default {
    methods:{
        changeLang(type){
            //设置语言类型 先写入cookie
            Cookie.set('language',type)
            //改变当前的多语言类型
            this.$i18n.locale = type
            this.$message.success('切换多语言成功!')
        }
    }
}
</script>

<style>

</style>