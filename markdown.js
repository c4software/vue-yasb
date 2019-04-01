const md = {
  mounted() {
    console.log("Mounted");
  },
  template: "<h1>Hello {{this.$route.params.id}}</h1>"
};

export default md;
