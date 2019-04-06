import { loadStatic } from "../helpers/index.js";

export default {
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
