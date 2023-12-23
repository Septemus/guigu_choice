import SvgIcon from "./SvgIcon.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import type { App, Component } from "vue";
const components: { [name: string]: Component } = {
  SvgIcon,
  ...ElementPlusIconsVue,
};
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key]);
    });
  },
};
