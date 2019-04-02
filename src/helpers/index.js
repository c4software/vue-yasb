import "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
import { articlesFolder } from "/src/config.js";

const buildUri = file => {
  return articlesFolder + file + ".md";
};

export const loadMarkdown = file => {
  return fetch(buildUri(file))
    .then(handleErrors)
    .then(content => {
      return content.text();
    })
    .then(content => {
      return marked(content);
    })
    .catch(err => {
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
