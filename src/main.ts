import { createApp } from "vue";

import pinia from "@/ts/store";

import "@/assets/styles/index.scss";

import App from "@/App.vue";

import "virtual:svg-icons-register";

import gloablComponent from "@/components/index";

import router from "@/ts/router";

import "nprogress/nprogress.css";

const app = createApp(App);

app.use(router);

app.use(gloablComponent);

app.use(pinia);

app.mount("#app");
