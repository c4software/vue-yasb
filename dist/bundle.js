import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.9/dist/vue.esm.browser.js';
import VueRouter from 'https://unpkg.com/vue-router@3.0.2/dist/vue-router.esm.js';
import 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';

var HomeBuilder = {
  name: "homeBuilder",
  template: "<div>Home</div>"
};

const debug = true;
const articlesFolder = "/articles/";

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

const loadMarkdown = file => {
  return fetch(buildUri(file))
    .then(handleErrors)
    .then(content => {
      return content.text();
    })
    .then(content => {
      return marked(content, { highlight: highlightCode, langPrefix: "hljs language-" });
    })
    .catch(err => {
      console.log(err);
      return "";
    });
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
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.load();
      }
    }
  },
  data() {
    return {
      data: ""
    };
  },
  methods: {
    load() {
      loadMarkdown(this.$route.params.filename).then(article => (this.data = article));
    }
  },
  template: "<div v-html='data'></div>"
};

// Hacky way to make esm work with browser-esm
window.process = { env: { NODE: "production" } };

Vue.use(VueRouter);

const routes = [{ path: "/", component: HomeBuilder }, { path: "/:filename", component: ArticleLoader }];

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
