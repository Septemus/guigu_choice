import { createRouter, createWebHashHistory } from "vue-router";
import useUserStore from "@/ts/store/user";
import pinia from "@/ts/store";
const userStore = useUserStore(pinia);
const homepage = () => import("@/components/HomePage.vue");
const login = () => import("@/components/LoginPage.vue");

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: {
        name: "homepage",
      },
    },
    {
      path: "/homepage",
      name: "homepage",
      beforeEnter: async (to, from) => {
        // reject the navigation
        console.log(to, from);
        try {
          await userStore.info();
          if (userStore.realUserInfo.name) {
            return true;
          } else {
            throw null;
          }
        } catch (err) {
          console.log(`verify failed!@@`);
          return { name: "login" };
        }
      },
      component: homepage,
    },
    {
      path: "/login",
      name: "login",
      component: login,
    },
  ],
});
