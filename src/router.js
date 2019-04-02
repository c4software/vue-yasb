import VueRouter from "https://unpkg.com/vue-router@3.0.2/dist/vue-router.esm.js";
import ArticleLoader from "/src/views/articleLoader.js";
import { html5HistoryMode } from "/src/config.js";

// Hacky way to make esm work with browser-esm
window.process = { env: { NODE: "production" } };

const routes = [{ path: "/:filename", component: ArticleLoader }];

const router = new VueRouter({
  routes: routes,
  mode: html5HistoryMode ? "history" : undefined
});

export default router;
