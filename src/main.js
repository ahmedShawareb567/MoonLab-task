import { createApp } from "vue";
import App from "./App.vue";
import Toaster from "@meforma/vue-toaster";
import { store } from "./store";
import { router } from "./router";

import "./assets/scss/app.scss";

const app = createApp(App);

app.use(Toaster);
app.use(store);
app.use(router);
app.mount("#app");
