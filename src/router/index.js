import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.9/dist/vue.esm.browser.js";
import VueRouter from "https://unpkg.com/vue-router@3.0.2/dist/vue-router.esm.js";
import HomeBuilder from "../views/homeBuilder.js";
import ArticleLoader from "../views/articleLoader.js";
import { html5HistoryMode } from "../config.js";
// Hacky way to make esm work with browser-esm
window.process = { env: { NODE: "production" } };

Vue.use(VueRouter);

const routes = [{ path: "/", component: HomeBuilder }, { path: "/:filename", component: ArticleLoader }];

const router = new VueRouter({
  routes: routes,
  mode: html5HistoryMode ? "history" : undefined
});

export default router;
