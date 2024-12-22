import { createApp } from "vue";
import App from "./App.vue";
import navConfig from "../nav-config.json";
import "@/assets/css/main.css";

// 创建 Vue 应用
const app = createApp(App);

app.config.globalProperties.$navConfig = navConfig;

app.mount("#app");
