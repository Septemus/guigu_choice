<template>
  <el-aside>
    <div class="logo">
      <img
        src="/logo.png"
        alt="logo"
      />
      <p v-if="!collapse"><span>硅谷甄选运营平台</span></p>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="collapse"
      :default-active="curRoute.name"
    >
      <template v-for="(item, index) of routes">
        <router-link
          v-if="!item.children"
          :key="item.name + 'nochild'"
          :to="{ name: item.name }"
        >
          <el-menu-item :index="item.name">
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <template #title>
              <span>{{ item.meta.title }}</span>
            </template>
          </el-menu-item>
        </router-link>
        <el-sub-menu
          v-else
          :key="item.name + 'child'"
          :index="index"
        >
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
            <!-- <el-icon>
          <i-ep-lock />
        </el-icon>
        <span>权限管理</span> -->
          </template>
          <!-- <template #title><span>Group One</span></template> -->
          <router-link
            v-for="child of item.children"
            :key="child.name"
            :to="{ name: child.name }"
          >
            <el-menu-item :index="child.name">
              <el-icon>
                <component :is="child.meta.icon"></component>
              </el-icon>
              <span>{{ child.meta.title }}</span>
            </el-menu-item>
          </router-link>
        </el-sub-menu>
      </template>
    </el-menu>
    <div
      class="collapse-button"
      @click="collapse = !collapse"
    >
      <el-icon>
        <i-ep-fold v-if="!collapse"></i-ep-fold>
        <i-ep-expand v-else></i-ep-expand>
      </el-icon>
    </div>
  </el-aside>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import homepage from "@/ts/router/route/homepage";
import { useRoute } from "vue-router";
const curRoute = useRoute();
const routes = homepage.children;
const collapse = ref(false);
</script>
<style lang="scss" scoped>
.el-aside {
  position: relative;
  // width: 260px;
  width: auto;
  height: 100%;
  padding: 10px 0;
  overflow-x: hidden;
  background-color: $homeSideBgColor;

  .logo {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: white;

    img {
      width: 40px;
      height: 40px;
    }

    p {
      // margin-left: 10px;
      position: absolute;
      left: 70px;
      display: block;
      width: 400px;

      span {
        // top: 0;
        // left: 0;
        // width: 1000px;
        font-size: 20px;
        // position: absolute;
      }
    }
  }

  .el-menu {
    background-color: inherit;
    border: none;

    .el-icon {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }

    a {
      color: inherit;
      text-decoration: none;
    }
  }

  .el-menu:not(.el-menu--collapse) {
    width: 260px;
  }

  .collapse-button {
    position: absolute;
    top: 50%;
    left: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 100px;
    color: white;
    background-color: rgb(33 61 91);
    border-radius: 40px 0 0 40px;
    transform: translate(-50px, -50%);
    cursor: pointer;

    i.el-icon {
      font-size: 25px;
    }
  }
}
</style>
