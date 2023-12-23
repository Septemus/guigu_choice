import useUserStore from "@/ts/store/user";
import pinia from "@/ts/store";
const userStore = useUserStore(pinia);
const homepage = () => import("@/pages/HomePage.vue");
const welcome = () => import("@/components/homepage/welcome/index.vue");
const screen = () => import("@/components/homepage/screen/index.vue");
const character = () => import("@/components/homepage/authority/character.vue");
const menu = () => import("@/components/homepage/authority/menu.vue");
const users = () => import("@/components/homepage/authority/users.vue");
const attribute = () => import("@/components/homepage/product/attribute.vue");
const brand = () => import("@/components/homepage/product/brand.vue");
const sku = () => import("@/components/homepage/product/sku.vue");
const spu = () => import("@/components/homepage/product/spu.vue");

export default {
  path: "/homepage",
  name: "homepage",
  beforeEnter: async () => {
    // reject the navigation
    //   console.log(to, from);
    try {
      await userStore.info();
      if (userStore.realUserInfo.name) {
        return true;
      } else {
        throw null;
      }
    } catch (err) {
      console.log(`verify failed!@@`);
    }
  },
  component: homepage,
  redirect: {
    name: "welcome",
  },
  children: [
    {
      path: "welcome",
      name: "welcome",
      component: welcome,
      meta: {
        title: "主页",
        icon: "home-filled",
      },
    },
    {
      path: "screen",
      name: "screen",
      component: screen,
      meta: {
        title: "数据大屏",
        icon: "platform",
      },
    },
    {
      path: "authority",
      name: "authority",
      children: [
        {
          path: "character",
          name: "character",
          component: character,
          meta: {
            title: "角色管理",
            icon: "user-filled",
          },
        },
        {
          path: "menu",
          name: "menu",
          component: menu,
          meta: {
            title: "菜单管理",
            icon: "monitor",
          },
        },
        {
          path: "users",
          name: "users",
          component: users,
          meta: {
            title: "用户管理",
            icon: "user",
          },
        },
      ],
      meta: {
        title: "权限管理",
        icon: "lock",
      },
    },
    {
      path: "product",
      name: "product",
      children: [
        {
          path: "attribute",
          name: "attribute",
          component: attribute,
          meta: {
            title: "属性管理",
            icon: "chrome-filled",
          },
        },
        {
          path: "brand",
          name: "brand",
          component: brand,
          meta: {
            title: "品牌管理",
            icon: "shopping-cart-full",
          },
        },
        {
          path: "sku",
          name: "sku",
          component: sku,
          meta: {
            title: "SKU管理",
            icon: "orange",
          },
        },
        {
          path: "spu",
          name: "spu",
          component: spu,
          meta: {
            title: "SPU管理",
            icon: "calendar",
          },
        },
      ],
      meta: {
        title: "商品管理",
        icon: "shopping-bag",
      },
    },
  ],
  meta: {
    title: "硅谷运营平台",
    icon: "shop",
  },
};
