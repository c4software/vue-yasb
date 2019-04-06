import "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
import { articlesFolder } from "/src/config.js";

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

export const loadMarkdown = file => {
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
