<template>
<!-- 工作日历 -->
  <div>
    <el-row type="flex" justify="end">
        <!-- 年 用组件给定一个日期 通过日期获取年,年取前五年+后五年 -->
        <el-select @change="dateChange" size="small" style="width:120px" v-model="currentYear">
            <el-option v-for="year in yearList" :key="year" :label="year" :value="year"></el-option>
        </el-select>
        <!-- 月 -->
        <el-select @change="dateChange" size="small" style="width:120px;margin-left:10px"  v-model="currentMonth">
            <el-option v-for="item in 12" :key="item" :label="item" :value="item"></el-option>
        </el-select>
    </el-row>
    <!-- 放置一个日历组件 -->
    <el-calendar v-model="currentDate">

    </el-calendar>
  </div>
</template>

<script>
export default {
    props:{
        year:{
            type:Date,
            default:()=>new Date()  //回调函数式的返回值
        }
    },
    data(){
        return {
            yearList:[], //要遍历的年的数组
            currentYear:null,//当前年份
            currentMonth:null,//当前月份
            currentDate:null,//日期组件所显示的内容
        }
    },
    created(){
        this.currentYear = this.year.getFullYear()
        this.currentMonth = this.year.getMonth()+1
        this.yearList = Array.from(Array(11),(v,i)=>this.currentYear-5+i)
        this.dateChange()
    },
    methods:{
        dateChange(){
            this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-1`) //当前月的第一天开始
        }
    }
}
</script>

<style  scoped>
 /deep/ .el-calendar-day {
  height:  auto;
 }
 /deep/ .el-calendar-table__row td,/deep/ .el-calendar-table tr td:first-child,  /deep/ .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 /deep/ .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 /deep/ .el-calendar__header {
   display: none
 }
</style>
