<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <div class="logo">
          <img
            src="/logo.png"
            alt="logo"
          />
          <p v-if="!collapse">硅谷甄选运营平台</p>
        </div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="collapse"
        >
          <el-menu-item index="1">
            <el-icon>
              <i-ep-home-filled />
            </el-icon>
            <template #title>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon>
              <i-ep-platform />
            </el-icon>
            <template #title>
              <span> 数据大屏 </span>
            </template>
          </el-menu-item>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <i-ep-lock />
              </el-icon>
              <span>权限管理</span>
            </template>
            <!-- <template #title><span>Group One</span></template> -->
            <el-menu-item index="3-1">
              <el-icon>
                <i-ep-user />
              </el-icon>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <el-icon>
                <i-ep-user-filled />
              </el-icon>
              <span>角色管理</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <el-icon>
                <i-ep-monitor />
              </el-icon>
              <span>菜单管理</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon>
                <i-ep-shopping-bag />
              </el-icon>
              <span>商品管理</span>
            </template>
            <!-- <template #title><span>Group One</span></template> -->
            <el-menu-item index="1-1">品牌管理</el-menu-item>
            <el-menu-item index="1-2">属性管理</el-menu-item>
            <el-menu-item index="1-3">SPU管理</el-menu-item>
            <el-menu-item index="1-4">SKU管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-button @click="collapse = !collapse">collapse</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
let collapse = ref(false);
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;

  .el-aside {
    // width: 260px;
    width: auto;
    height: 100%;
    padding: 10px;
    background-color: $homeSideBgColor;

    .logo {
      display: flex;
      align-items: center;
      color: white;

      img {
        width: 40px;
        height: 40px;
      }

      p {
        display: inline;
        margin-left: 10px;
        font-size: 20px;
      }
    }

    .el-menu {
      background-color: inherit;
      border: none;
    }

    .el-menu:not(.el-menu--collapse) {
      width: 260px;
    }
  }
}
</style>
