import { loadArticle } from "../helpers/index.js";

export default {
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
