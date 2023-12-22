import { createApp } from "vue";

import pinia from "@/ts/store";

import "@/assets/styles/index.scss";

import App from "@/App.vue";

import "virtual:svg-icons-register";

import gloablComponent from "@/components/index";

import router from "@/ts/router";

const app = createApp(App);

app.use(router);

app.use(gloablComponent);

app.use(pinia);

// app.directive("hide", {
//   beforeUpdate: (el: HTMLElement, binding: { value: boolean }) => {
//     el.style.visibility = binding.value ? "hidden" : "visible";
//     // el.style.position = binding.value ? "absolute" : "relative";
//   },
// });

app.mount("#app");
