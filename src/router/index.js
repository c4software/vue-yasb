import Vue from "../../web_modules/vue/dist/vue.esm.browser.min.js";
import VueRouter from "../../web_modules/vue-router.js";
import ArticleLoader from "../views/articleLoader.js";
import { html5HistoryMode, home } from "../config.js";
import staticLoader from "../views/staticLoader.js";

Vue.use(VueRouter);

const routes = [{ path: "/", component: staticLoader, meta: { file: home } }, { path: "/:filename", component: ArticleLoader }];

const router = new VueRouter({
  routes: routes,
  mode: html5HistoryMode ? "history" : undefined
});

export default router;
