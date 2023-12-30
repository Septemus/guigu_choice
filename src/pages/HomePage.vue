<template>
  <div class="common-layout">
    <el-container>
      <Aside />
      <el-container>
        <Header />
        <el-main>
          <router-view
            v-if="flag"
            v-slot="{ Component }"
          >
            <transition
              name="router"
              mode="out-in"
            >
              <component :is="Component"></component>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Aside from "@/components/homepage/aside/index.vue";
import Header from "@/components/homepage/header/index.vue";
import { nextTick, ref, watch } from "vue";
import useLayOutSettingStore from "@/ts/store/layout";
const flag = ref(true);
const layoutStore = useLayOutSettingStore();
watch(
  () => layoutStore.refsh,
  (val) => {
    if (val) {
      flag.value = false;
      nextTick(() => {
        flag.value = true;
      });
    }
  }
);
</script>

<style lang="scss" scoped>
.el-container {
  position: relative;
  height: 100vh;

  .el-main {
    position: absolute;
    top: 50px;
    width: 100%;
    height: calc(100vh - 50px);

    .router-enter-active,
    .router-leave-active {
      transition: opacity 0.5s ease;
    }

    .router-enter-from,
    .router-leave-to {
      opacity: 0;
    }
  }
}
</style>
