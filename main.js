import "https://cdn.jsdelivr.net/npm/vue@2.6.9/dist/vue.min.js";
import VueRouter from "https://unpkg.com/vue-router@3.0.2/dist/vue-router.esm.js";
import routes from "./routes.js";

// Hacky way to make esm work with browser-esm
window.process = { env: { NODE: "production" } };

// Enable VueJS Debug
Vue.config.devtools = true;

const router = new VueRouter({
  routes: routes
});

new Vue({
  router,
  el: "#app",
  mounted() {
    console.log("Mounted");
  }
});
