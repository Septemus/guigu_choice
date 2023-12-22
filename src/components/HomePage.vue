<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <div class="logo">
          <img
            src="/logo.png"
            alt="logo"
          />
          <p v-if="!collapse"><span>硅谷甄选运营平台</span></p>
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
            <el-menu-item index="4-1">
              <el-icon>
                <i-ep-shopping-cart-full />
              </el-icon>
              品牌管理
            </el-menu-item>
            <el-menu-item index="4-2">
              <el-icon>
                <i-ep-chrome-filled />
              </el-icon>
              属性管理
            </el-menu-item>
            <el-menu-item index="4-3">
              <el-icon>
                <i-ep-calendar />
              </el-icon>
              SPU管理
            </el-menu-item>
            <el-menu-item index="4-4">
              <el-icon>
                <i-ep-orange />
              </el-icon>
              SKU管理
            </el-menu-item>
          </el-sub-menu>
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
      <el-main> </el-main>
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
    padding: 10px 0;
    background-color: $homeSideBgColor;
    overflow-x: hidden;
    position: relative;
    .logo {
      padding: 0 20px;
      display: flex;
      align-items: center;
      color: white;
      position: relative;
      img {
        width: 40px;
        height: 40px;
      }

      p {
        display: block;
        // margin-left: 10px;
        position: absolute;
        left: 70px;
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
    }

    .el-menu:not(.el-menu--collapse) {
      width: 260px;
    }

    .collapse-button {
      cursor: pointer;
      position: absolute;
      top: 50%;
      left: 100%;
      transform: translate(-50px, -50%);
      color: white;
      width: 50px;
      height: 100px;
      background-color: rgb(33, 61, 91);
      border-radius: 40px 0px 0px 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      i.el-icon {
        font-size: 25px;
      }
    }
  }
}
</style>
