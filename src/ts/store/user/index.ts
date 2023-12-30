import type {
  loginFormData,
  loginResponseData,
  userInfoData,
  userInfoReponseData,
} from "@/api/user/type";
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo } from "@/api/user/index";
import { reactive, ref, Ref } from "vue";
import {
  constantRoute,
  asyncRoute,
  anyRoute,
} from "@/ts/router/route/homepage";
import cloneDeep from "lodash/cloneDeep";
import router from "@/ts/router";
import { RouteRecordRaw } from "vue-router";
const initVal: userInfoData = {
  routes: [],
  buttons: [],
  roles: [],
  name: "",
  avatar: "",
};
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        //硅谷333账号:product\trademark\attr\sku
        item.children = filterAsyncRoute(item.children, routes);
      }
      return true;
    }
  });
}
// import { Ref, ref } from "vue";
export default defineStore("user", () => {
  // const token: Ref<string | null> = ref(getToken());
  const realUserInfo: userInfoData = reactive(initVal);
  type body = {
    path: string;
    name: string;
    meta: { icon: string; title: string };
    redirect?: unknown;
    children?: body[];
  };
  const menuRoutes: Ref<body[]> = ref(constantRoute[0].children);
  function login(loginInfo: loginFormData): Promise<loginResponseData> {
    return reqLogin(loginInfo);
  }
  function info(): Promise<boolean> {
    // token.value = getToken();
    return reqUserInfo().then((res: userInfoReponseData) => {
      if (res.ok) {
        updInfo(res.data);
        // debugger;
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          res.data.routes
        );
        menuRoutes.value = constantRoute[0].children.concat(userAsyncRoute);
        // [...userAsyncRoute].forEach((route: any) => {
        //   router.removeRoute("homepage");
        // });
        router.removeRoute("homepage");
        router.addRoute({
          ...constantRoute[0],
          children: [
            ...constantRoute[0].children,
            ...(menuRoutes.value as RouteRecordRaw[]),
          ],
        });
        router.addRoute(anyRoute[0]);
        //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
      }
      return res.ok;
    });
  }
  function updInfo(res: userInfoData): void {
    Object.keys(realUserInfo).forEach((key: string) => {
      realUserInfo[key] = res[key];
    });
  }
  function $reset() {
    Object.keys(realUserInfo).forEach((key: string) => {
      realUserInfo[key] = initVal[key];
    });
  }
  return { realUserInfo, login, info, $reset, menuRoutes };
});
