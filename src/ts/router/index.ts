import { createRouter, createWebHashHistory } from "vue-router";
import routes from "@/ts/router/route";
import nprogress from "nprogress";
import useUserStore from "@/ts/store/user";
import pinia from "@/ts/store";
const userStore = useUserStore(pinia);
const ret = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});
ret.beforeEach(async (to: any) => {
  //to:你将要访问那个路由
  //from:你从来个路由而来
  //next:路由的放行函数
  nprogress.start();
  console.log(`router guard encountered!@@`);
  try {
    if (!userStore.realUserInfo.name) {
      const verified = await userStore.info();
      if (to.name === "login") {
        if (verified) {
          return { name: "homepage" };
        } else {
          return true;
        }
      } else {
        if (verified) {
          debugger;
          return to;
        } else {
          return { name: "login" };
        }
      }
    } else {
      if (to.name === "login") {
        return { name: "homepage" };
      } else return true;
    }
  } catch (err) {
    console.log(`verify failed!@@`, err);
    return { name: "404" };
  }
  //获取token,去判断用户登录、还是未登录
});
//全局后置守卫
ret.afterEach(() => {
  nprogress.done();
});
export default ret;
