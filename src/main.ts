import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "@/assets/base.css";
import "@progress/kendo-theme-default/dist/all.css";

const app = createApp(App);

app.use(router).use(createPinia()).mount("#app");
