export default {
  input: "src/main.js",
  output: {
    file: "dist/bundle.js",
    format: "esm"
  }
  //plugins: [require("import-http/rollup")()]
};