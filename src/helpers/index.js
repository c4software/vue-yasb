import "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
import { articlesFolder } from "../config.js";

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

export const loadArticle = filename => {
  // FIX ME CLEANPATH
  return loadMarkdown(buildUri(filename));
};

export const loadStatic = filename => {
  // FIXME CLEAN PATH
  return loadMarkdown(filename);
};

export const loadMarkdown = uri => {
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
