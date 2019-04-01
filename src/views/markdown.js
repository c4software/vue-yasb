import { loadMarkdown } from "../helpers/index.js";

export default {
  name: "dynamicMd",
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
      loadMarkdown(this.$route.params.path).then(article => (this.data = article));
    }
  },
  template: "<div v-html='data'></div>"
};
