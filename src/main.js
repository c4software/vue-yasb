import "https://cdn.jsdelivr.net/npm/vue@2.6.9/dist/vue.min.js";
import router from "./router.js";

// Enable VueJS Debug
Vue.config.devtools = true;

new Vue({
  router,
  el: "#app",
  mounted() {
    console.log("App started");
  }
});
