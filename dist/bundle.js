import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.9/dist/vue.esm.browser.js';
import VueRouter from 'https://unpkg.com/vue-router@3.0.2/dist/vue-router.esm.js';
import 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';

const debug = true;
const articlesFolder = "./articles/";
const home = "./README.md";

const buildUri = file => {
  return articlesFolder + file + ".md";
};

const highlightCode = code => {
  // Depend on external library… (Not ESM ready)
  if (hljs) {
    return hljs.highlightAuto(code).value;
  } else {
    return code;
  }
};

const loadArticle = filename => {
  // FIX ME CLEANPATH
  return loadMarkdown(buildUri(filename));
};

const loadStatic = filename => {
  // FIXME CLEAN PATH
  return loadMarkdown(filename);
};

const loadMarkdown = uri => {
  return fetch(uri)
    .then(handleErrors)
    .then(content => {
      return content.text();
    })
    .then(parseMarkdown)
    .catch(err => {
      return "";
    });
};

const parseMarkdown = content => {
  return marked(content, { highlight: highlightCode, langPrefix: "hljs language-" });
};

const handleErrors = response => {
  if (!response.ok) {
    throw response;
  } else {
    return response;
  }
};

var ArticleLoader = {
  name: "articleLoader",
  data() {
    return {
      data: ""
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        loadArticle(this.requestArticle).then(article => (this.data = article));
      }
    }
  },
  computed: {
    requestArticle() {
      return this.$route.params.filename;
    }
  },
  template: "<div v-html='data'></div>"
};

var staticLoader = {
  name: "staticLoader",
  computed: {
    target() {
      return this.$route.meta["file"] || "";
    }
  },
  data() {
    return {
      data: ""
    };
  },
  mounted() {
    loadStatic(this.target).then(data => (this.data = data));
  },
  template: "<div v-html='data'></div>"
};

// Hacky way to make esm work with browser-esm
window.process = { env: { NODE: "production" } };

Vue.use(VueRouter);

const routes = [{ path: "/", component: staticLoader, meta: { file: home } }, { path: "/:filename", component: ArticleLoader }];

const router = new VueRouter({
  routes: routes,
  mode: undefined
});

// Enable VueJS Debug
Vue.config.devtools = debug;

new Vue({
  router,
  el: "#app",
  mounted() {
    console.log("App started");
  }
});
