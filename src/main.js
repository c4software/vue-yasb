import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.9/dist/vue.esm.browser.js";
import router from "/src/router/index.js";
import { debug } from "/src/config.js";

// Enable VueJS Debug
Vue.config.devtools = debug;

new Vue({
  router,
  el: "#app",
  mounted() {
    console.log("App started");
  }
});
