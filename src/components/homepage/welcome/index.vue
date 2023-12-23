<template>
  <div>
    <el-card class="box-card">
      <div class="box">
        <img
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
          alt="Hello!"
        />
        <div class="description">
          <h3>晚上好！</h3>
          <p>硅谷甄选运营平台</p>
        </div>
      </div>
    </el-card>
    <div class="bottom">
      <svg-icon
        name="welcome"
        class="welcome"
      ></svg-icon>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.box-card {
  .box {
    display: flex;

    img {
      width: 100px;
      height: 100px;
      border-radius: 100px;
    }

    .description {
      margin-left: 20px;

      h3 {
        margin-bottom: 30px;
        font-weight: 900;
        font-size: 30px;
        line-height: 1;
      }

      p {
        color: skyblue;
        font-style: italic;
      }
    }
  }
}

.bottom {
  width: 100%;
  height: 300px;

  .welcome {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  margin-top: 10px;
}
</style>
