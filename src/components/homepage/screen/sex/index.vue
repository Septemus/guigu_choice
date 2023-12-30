<template>
  <div class="box sex">
    <div class="top">
      <div class="title">男女比例</div>
      <div class="line"></div>
    </div>
    <div class="graphic">
      <div class="man">
        <img
          src="@/assets/images/screen/man.png"
          alt=""
        />
      </div>
      <div class="woman">
        <img
          src="@/assets/images/screen/woman.png"
          alt=""
        />
      </div>
    </div>
    <div class="rate">
      <p>男：58%</p>
      <p>女：42%</p>
    </div>
    <div
      ref="charts"
      class="charts"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
const charts = ref<HTMLElement>();
onMounted(() => {
  const bar = echarts.init(charts.value);
  bar.setOption({
    //组件标题
    title: {
      text: "男女比例", //主标题
      textStyle: {
        //主标题颜色
        color: "skyblue",
        fontSize: 15,
      },
      top: "70%",
      left: "40%",
    },
    //x|y
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: "category",
    },
    series: [
      {
        type: "bar",
        data: [58],
        barWidth: 15,
        z: 100,
        itemStyle: {
          color: "skyblue",
          borderRadius: 20,
        },
      },
      {
        type: "bar",
        data: [100],
        barWidth: 15,
        //调整女士柱条位置
        barGap: "-100%",
        itemStyle: {
          color: "pink",
          borderRadius: 20,
        },
      },
    ],
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
.sex {
  flex: 1;

  .graphic {
    display: flex;
    justify-content: center;
    height: 40%;
    margin: 30px 10px auto;

    > div {
      position: relative;
      width: 30%;
      height: 80%;
      margin: 10px;
      background-size: 100% 100%;

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        transform: translate(-50%, -50%);
      }
    }

    > .man {
      background-image: url("@/assets/images/screen/man-bg.png");
    }

    > .woman {
      background-image: url("@/assets/images/screen/woman-bg.png");
    }
  }

  .rate {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
  }

  .charts {
    width: 100%;
    height: 20%;
    // margin-top: 0;
  }
}
</style>
