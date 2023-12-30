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

export const constantRoute = [
  {
    path: "/homepage",
    name: "homepage",
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
    ],
    meta: {
      title: "硅谷运营平台",
      icon: "shop",
    },
  },
];
export const asyncRoute = [
  {
    path: "acl",
    name: "Acl",
    children: [
      {
        path: "role",
        name: "Role",
        component: character,
        meta: {
          title: "角色管理",
          icon: "user-filled",
        },
      },
      {
        path: "permission",
        name: "Permission",
        component: menu,
        meta: {
          title: "菜单管理",
          icon: "monitor",
        },
      },
      {
        path: "user",
        name: "User",
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
    name: "Product",
    children: [
      {
        path: "attr",
        name: "Attr",
        component: attribute,
        meta: {
          title: "属性管理",
          icon: "chrome-filled",
        },
      },
      {
        path: "trademark",
        name: "Trademark",
        component: brand,
        meta: {
          title: "品牌管理",
          icon: "shopping-cart-full",
        },
      },
      {
        path: "sku",
        name: "Sku",
        component: sku,
        meta: {
          title: "SKU管理",
          icon: "orange",
        },
      },
      {
        path: "spu",
        name: "Spu",
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
];
export const anyRoute = [
  {
    //任意路由
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
    meta: {
      title: "任意路由",
      hidden: true,
      icon: "DataLine",
    },
  },
];
