<template>
  <div class="counter box">
    <div class="top">
      <div class="title">数据统计</div>
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
  const counter = echarts.init(charts.value);
  counter.setOption({
    title: {
      text: "游客消费统计",
      textStyle: {
        color: "white",
      },
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "消费", max: 6500 },
        { name: "好感", max: 16000 },
        { name: "出行", max: 30000 },
        { name: "小吃", max: 38000 },
        { name: "爱好", max: 52000 },
        { name: "景点", max: 25000 },
      ],
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: [
          {
            value: [4200, 8000, 20000, 35000, 50000, 18000],
            name: "购物",
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: "吃饭",
          },
        ],
      },
    ],
  });
});
</script>
<style lang="scss" scoped>
.counter {
  flex: 1;

  .charts {
    width: 100%;
    height: 80%;
  }
}
</style>
