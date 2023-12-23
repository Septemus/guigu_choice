<template>
  <el-header>
    <el-breadcrumb
      :separator-icon="'ArrowRight'"
      class="header-left"
    >
      <el-breadcrumb-item
        v-for="(item, index) in route.matched"
        :key="index"
        :to="item.path"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="header-right">
      <el-button circle>
        <el-icon>
          <i-ep-refresh />
        </el-icon>
      </el-button>
      <el-button circle>
        <el-icon>
          <i-ep-full-screen />
        </el-icon>
      </el-button>
      <el-button circle>
        <el-icon>
          <i-ep-setting />
        </el-icon>
      </el-button>
      <el-avatar :src="userStore.realUserInfo.avatar">
        <el-icon v-if="!userStore.realUserInfo.avatar">
          <i-ep-user-filled />
        </el-icon>
      </el-avatar>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.realUserInfo.name }}
          <el-icon class="el-icon--right">
            <i-ep-arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import useUserStore from "@/ts/store/user";
const userStore = useUserStore();
const route = computed(() => useRoute());
</script>
<style lang="scss" scoped>
.el-header {
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;

  .header-right {
    display: flex;
    align-items: center;

    > .el-avatar,
    > .el-button {
      width: 24px;
      height: 24px;
      font-size: 12px;
    }

    > * {
      margin-left: 12px;
    }

    .el-dropdown {
      .el-dropdown-link {
        // color: var(--el-color-primary);
        display: flex;
        align-items: center;
        cursor: pointer;

        &:focus-visible {
          border: none;
          outline: none;
        }
      }
    }
  }
}
</style>
