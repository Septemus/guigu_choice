<template>
  <div class="box tourist">
    <div class="top">
      <div class="title">实时游客统计</div>
      <div class="line"></div>
      <div class="right">可预约总量<span>99999人</span></div>
    </div>
    <div class="number">
      <span class="cell">9</span>
      <span class="cell">9</span>
      <span class="cell">9</span>
      <span class="cell">9</span>
      <span class="cell">9</span>
      <span class="cell">9</span>
      <span class="cell">人</span>
    </div>
    <div
      ref="charts"
      class="charts"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import "echarts-liquidfill";
import * as echarts from "echarts";
const charts = ref();
try {
  onMounted(() => {
    const waterBall = echarts.init(charts.value);
    waterBall.setOption({
      //标题组件
      title: {
        text: "水球图",
        textStyle: {
          fontSize: 17,
        },
      },
      //x|y轴组件
      xAxis: {},
      yAxis: {},

      //系列:决定你展示什么样的图形图标
      series: {
        type: "liquidFill", //系列
        data: [0.6, 0.4, 0.2], //展示的数据
        waveAnimation: true, //动画
        animationDuration: 3,
        animationDurationUpdate: 0,
        radius: "100%", //半径
        label: {
          fontSize: 25,
        },
        outline: {
          //外层边框颜色设置
          show: true,
          borderDistance: 4,
          itemStyle: {
            color: "skyblue",
            borderColor: "#294D99",
            borderWidth: 2,
            shadowBlur: 20,
            shadowColor: "rgba(0, 0, 0, 0.25)",
          },
        },
      },
      //布局组件
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    });
    console.log(waterBall.getOption());

    // waterBall.resize();
  });
} catch (err) {
  console.log(`echarts error:@@`, err);
}
</script>
<style lang="scss" scoped>
.tourist {
  flex: 1.2;

  > .number {
    display: flex;
    margin-top: 30px;
    color: $s-blue;

    > span.cell {
      display: block;
      flex: 1;
      text-align: center;
      background-image: url("@/assets/images/screen/total.png");
      background-size: 100% 100%;
    }
  }

  > .charts {
    width: 100%;
    height: 70%;
    margin-top: 5px;
  }
}
</style>
