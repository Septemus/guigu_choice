<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;

  .el-aside {
    width: 260px;
    height: 100%;
    background-color: $homeSideBgColor;
  }
}
</style>
