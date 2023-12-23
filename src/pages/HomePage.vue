<template>
  <div class="common-layout">
    <el-container>
      <Aside />
      <el-container>
        <Header />

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Aside from "@/components/homepage/aside/index.vue";
import Header from "@/components/homepage/header/index.vue";
</script>

<style lang="scss" scoped>
.el-container {
  position: relative;
  height: 100vh;

  // .el-header {
  //   position: sticky;
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   width: 100%;
  //   height: 50px;

  //   .header-right {
  //     display: flex;
  //     align-items: center;

  //     > .el-avatar,
  //     > .el-button {
  //       width: 24px;
  //       height: 24px;
  //       font-size: 12px;
  //     }

  //     > * {
  //       margin-left: 12px;
  //     }

  //     .el-dropdown {
  //       .el-dropdown-link {
  //         // color: var(--el-color-primary);
  //         display: flex;
  //         align-items: center;
  //         cursor: pointer;

  //         &:focus-visible {
  //           border: none;
  //           outline: none;
  //         }
  //       }
  //     }
  //   }
  // }

  .el-main {
    position: absolute;
    top: 50px;
    width: 100%;
    height: calc(100vh - 50px);

    // .box-card {
    //   .box {
    //     display: flex;

    //     img {
    //       width: 100px;
    //       height: 100px;
    //       border-radius: 100px;
    //     }

    //     .description {
    //       margin-left: 20px;

    //       h3 {
    //         margin-bottom: 30px;
    //         font-weight: 900;
    //         font-size: 30px;
    //         line-height: 1;
    //       }

    //       p {
    //         color: skyblue;
    //         font-style: italic;
    //       }
    //     }
    //   }
    // }

    // .bottom {
    //   width: 100%;
    //   height: 300px;

    //   .welcome {
    //     display: block;
    //     width: 100%;
    //     height: 100%;
    //     margin: 0 auto;
    //   }

    //   margin-top: 10px;
    // }
  }
}
</style>
