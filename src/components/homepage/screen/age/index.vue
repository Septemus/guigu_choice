<template>
  <div class="box age">
    <div class="top">
      <div class="title">年龄比例</div>
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
  const agePie = echarts.init(charts.value);
  agePie.setOption({
    tooltip: {
      trigger: "item",
    },
    legend: {
      right: 10,
      top: 40,
      orient: "vertical", //图例组件方向的设置
      textStyle: {
        color: "white",
        fontSize: 10,
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["30%", "50%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "inside",
          color: "white",
        },

        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "军事" },
          { value: 735, name: "新闻" },
          { value: 580, name: "直播" },
          { value: 484, name: "娱乐" },
          { value: 300, name: "财经" },
        ],
      },
    ],
    //调整图形图标的位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  });
});
</script>
<style lang="scss" scoped>
.age {
  .charts {
    width: 100%;
    height: 80%;
  }

  flex: 1;
}
</style>
