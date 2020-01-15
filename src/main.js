import Vue from "../web_modules/vue/dist/vue.esm.browser.min.js";
import router from "./router/index.js";
import { debug } from "./config.js";

// Enable VueJS Debug
Vue.config.devtools = debug;

new Vue({
  router,
  el: "#app"
});
