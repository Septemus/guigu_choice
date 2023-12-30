<template>
  <div
    ref="outer"
    class="screen-outer"
  >
    <div
      ref="screen"
      class="screen-container"
    >
      <div class="top-bar">
        <div class="left">
          <content @click="goFullScreen"
            >{{ state ? "退出全屏" : "进入全屏" }}
          </content>
        </div>
        <div class="center"><content>智慧旅游可视化大数据平台</content></div>
        <div class="right"><content>统计报告</content></div>
      </div>
      <div class="body">
        <div class="left">
          <tourist />
          <sex />
          <age />
        </div>
        <div class="center">
          <mymap />
          <trend />
        </div>
        <div class="right">
          <rank />
          <year />
          <counter />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import tourist from "@/components/homepage/screen/tourist/index.vue";
import sex from "@/components/homepage/screen/sex/index.vue";
import age from "@/components/homepage/screen/age/index.vue";
import rank from "@/components/homepage/screen/rank/index.vue";
import year from "@/components/homepage/screen/year/index.vue";
import counter from "@/components/homepage/screen/counter/index.vue";
import trend from "@/components/homepage/screen/trend/index.vue";
import mymap from "@/components/homepage/screen/map/index.vue";
import { onMounted, ref, onUnmounted } from "vue";
import screenfull from "screenfull";

function goFullScreen() {
  if (screenfull.isEnabled) {
    if (!state.value) {
      screenfull.request(outer.value);
    } else {
      screenfull.exit();
    }
    state.value = !state.value;
  }
}
function adapt() {
  function getScale(w = 1920, h = 1080) {
    const ww = (outer.value as HTMLElement).clientWidth / w;
    const wh = (outer.value as HTMLElement).clientHeight / h;
    return ww < wh ? ww : wh;
  }
  (screen.value as HTMLElement).style.transform =
    `scale(${getScale()}) translate(-50%,-50%)`;
}
const screen = ref<HTMLElement>();
const outer = ref<HTMLElement>();
const state = ref(false);
onMounted(() => {
  adapt();
  window.addEventListener("resize", adapt);
});
onUnmounted(() => {
  // (screen.value as HTMLElement).style.transform =
  //   `scale(${getScale()}) translate(-50%,-50%)`;
  // window.onresize = () => {
  //   (screen.value as HTMLElement).style.transform =
  //     `scale(${getScale()}) translate(-50%,-50%)`;
  // };
  window.removeEventListener("resize", adapt);
});
</script>
<style lang="scss">
.screen-outer {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/images/screen/screen-bg.png");
  background-size: 100% 100%;

  .screen-container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1920px;
    height: 1080px;
    // width: 100%;
    // height: 100%;
    font-size: 12px;
    transform: translate(-50%, -50%);
    transform-origin: left top;
    // scale: 0.2;

    $topArr: ("left", "right", "center");

    .top-bar {
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      height: 40px;

      @each $item in $topArr {
        .#{$item} {
          flex: if(#{$item} == "center", 2, 1.5);
          color: $s-blue;
          background-image: url("@/assets/images/screen/dataScreen-header-#{$item}-bg.png");
          background-repeat: no-repeat;
          background-size: if(#{$item} == "center", 100% 100%, cover);

          content {
            display: block;
            // min-width: 150px;
            width: if(#{$item} == "center", 100%, 150px);
            height: 40px;
            font-size: if(#{$item} == "center", 25px, 15px);
            line-height: 40px;
            text-align: center;
            background-size: 100% 100%;
            cursor: pointer;
          }
        }
      }

      .left {
        content {
          float: right;
          background-image: url("@/assets/images/screen/dataScreen-header-btn-bg-l.png");
        }
      }

      .right {
        content {
          float: left;
          background-image: url("@/assets/images/screen/dataScreen-header-btn-bg-r.png");
        }
      }
    }

    .body {
      display: flex;
      width: 100%;
      height: calc(100% - 40px);
      overflow-x: hidden;
      color: white;

      > .left,
      > .right {
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100%;
      }

      .center {
        display: flex;
        flex: 4;
        flex-direction: column;
      }

      .box {
        margin-top: 10px;
        background-image: url("@/assets/images/screen/dataScreen-main-lb.png");
        background-size: 100% 100%;

        > .top {
          > .line {
            width: 68px;
            height: 7px;
            margin-top: 10px;
            background: url("@/assets/images/screen/dataScreen-title.png")
              no-repeat;
          }

          > .right {
            float: right;

            > span {
              color: yellowgreen;
            }
          }
        }
      }
    }
  }
}
</style>
