<template>
  <div class="body">
    <el-row>
      <el-col
        :span="12"
        :xs="0"
      ></el-col>
      <el-col
        :span="12"
        :xs="24"
      >
        <el-form class="login-form">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item>
            <el-input v-model="loginInfo.username">
              <template #prefix>
                <el-icon class="el-input__icon">
                  <i-ep-user />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="loginInfo.password"
              type="password"
              show-password
            >
              <template #prefix>
                <el-icon class="el-input__icon">
                  <i-ep-lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="operation">
              <el-button
                class="login-bt"
                type="primary"
                @click="Login"
              >
                登录
              </el-button>
              <el-button
                class="reg-bt"
                type="success"
              >
                注册</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import useUserStore from "@/store/user";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";
// import { userInfoReponseData } from "@/api/user/type";
const loginInfo = reactive({
  username: "admin",
  password: "atguigu123",
});
const userStore = useUserStore();
const router = useRouter();
function Login() {
  console.log(`logging!@@`);
  userStore
    .login(loginInfo)
    .then((res): Promise<null> => {
      if (res.ok) {
        console.log("登陆成功！@@", res);
        ElNotification({
          title: "Success",
          message: "登陆成功！",
          type: "success",
        });
        localStorage.setItem("token", res.data);

        return userStore.info();
      } else {
        return Promise.reject(res.message);
      }
    })
    .then(() => {
      router.push({
        name: "homepage",
      });
    })
    .catch((err: string) => {
      console.log("登陆失败！@@", err);
      ElNotification({
        title: "Error",
        message: err,
        type: "error",
      });
    });
}
</script>
<style lang="scss" scoped>
.body {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/images/background.jpg");
  background-size: cover;

  .el-row {
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);

    .login-form {
      width: 80%;
      // position: absolute;
      // top: 50%;
      padding: 40px;
      background-color: initial;
      background-image: url("@/assets/images/login_form.png");
      background-size: cover;
      // transform: translateY(-50%);

      h1 {
        font-size: 40px;
      }

      h2 {
        margin: 20px 0;
        font-weight: 400;
        font-size: 20px;
      }

      .operation {
        display: flex;
        justify-content: space-between;
        width: 100%;

        button {
          width: 45%;
        }
      }
    }
  }
}
</style>
