import VueRouter from "https://unpkg.com/vue-router@3.0.2/dist/vue-router.esm.js";
import ArticleLoader from "./views/articleLoader.js";

// Hacky way to make esm work with browser-esm
window.process = { env: { NODE: "production" } };

const routes = [{ path: "/:path", component: ArticleLoader }];

const router = new VueRouter({
  routes: routes
  //mode: "history"
});

export default router;
