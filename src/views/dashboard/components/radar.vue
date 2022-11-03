<template>
  <!-- 雷达图 -->
  <div ref="myDiv" class="radarDiv"></div>
</template>

<script>
// const echarts = require("echarts"); 完整加载
const echarts = require("echarts/lib/echarts"); //引入echarts主模块
require("echarts/lib/component/title"); //引入标题
require("echarts/lib/component/legend"); //引入图例
require("echarts/lib/chart/radar"); //引入雷达图

export default {
  //页面渲染完毕 可以操作dom
  mounted() {
    const myChart = echarts.init(this.$refs.myDiv);
    myChart.setOption({
      title: {
        text: "雷达图",
      },
      legend: {
        data: ["张三", "李四"],
      },
      radar: {
        // shape: 'circle',
        //每个区域的最高值
        indicator: [
          { name: "工作效率", max: 100 },
          { name: "考勤", max: 100 },
          { name: "积极性", max: 100 },
          { name: "团队意识", max: 100 },
          { name: "自主学习", max: 100 },
          { name: "正确率", max: 100 },
        ],
      },
      series: [
        {
          name: "Budget vs spending",
          type: "radar",
          data: [
            {
              value: [60,100,40,50,99,80],
              name: "张三",
            },
            {
              value: [100,60,70,80,90,100],
              name: "李四",
            },
          ],
        },
      ],
    });
  },
};
</script>

<style>
.radarDiv {
  width: 600px;
  height: 400px;
}
</style>