// import useUserStore from "@/ts/store/user";
// import pinia from "@/ts/store";
// const userStore = useUserStore(pinia);
// const homepage = () => import("@/pages/HomePage.vue");
const login = () => import("@/pages/LoginPage.vue");
import homepage from "./homepage";
// const welcome = () => import("@/components/homepage/welcome/index.vue");
// const screen = () => import("@/components/homepage/screen/index.vue");
// const character = () => import("@/components/homepage/authority/character.vue");
// const menu = () => import("@/components/homepage/authority/menu.vue");
// const users = () => import("@/components/homepage/authority/users.vue");
// const attribute = () => import("@/components/homepage/product/attribute.vue");
// const brand = () => import("@/components/homepage/product/brand.vue");
// const sku = () => import("@/components/homepage/product/sku.vue");
// const spu = () => import("@/components/homepage/product/spu.vue");

const routes = [
  {
    path: "/",
    redirect: {
      name: "homepage",
    },
  },
  homepage,
  {
    path: "/login",
    name: "login",
    component: login,
  },
];
export default routes;
