<template>
  <div class="year box">
    <div class="top">
      <div class="title">年度游客量对比</div>
      <div class="line"></div>
    </div>
    <div
      ref="charts"
      class="charts"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
const charts = ref<HTMLElement>();
onMounted(() => {
  const rank = echarts.init(charts.value);
  rank.setOption({
    title: {
      text: "散点图",
      left: "40%",
      textStyle: {
        color: "white",
      },
    },
    xAxis: {
      type: "category",
      show: true,
    },
    yAxis: {
      show: false,
    },
    grid: {
      left: 10,
      top: 20,
      right: 0,
      bottom: 20,
    },
    series: {
      type: "scatter",
      data: [
        33, 88, 21, 9, 88, 234, 113, 1231, 674, 3, 88, 33, 21, 888, 3332, 313,
        123, 5, 657, 7,
      ],
      //标记图形设置
      symbol: "diamond",
      symbolSize: 16,
      //图文标签
      label: {
        show: true,
        position: "top",
        color: "red",
      },
      //散点图标记的颜色
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "red", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "blue", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
  });
});
</script>
<style lang="scss" scoped>
.year {
  flex: 1;

  .charts {
    width: 100%;
    height: 80%;
  }
}
</style>
