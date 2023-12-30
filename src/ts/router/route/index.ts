const login = () => import("@/pages/LoginPage.vue");
import { constantRoute } from "@/ts/router/route/homepage";
import notfound from "@/pages/404.vue";
const routes = [
  {
    path: "/",
    redirect: {
      name: "homepage",
    },
  },
  constantRoute[0],
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/404",
    name: "404",
    component: notfound,
  },
];
export default routes;
