import { createRouter, createWebHashHistory } from "vue-router";
import routes from "@/ts/router/route";

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
