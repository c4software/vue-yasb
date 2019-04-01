import "https://cdn.jsdelivr.net/npm/marked/marked.min.js";

const buildUri = file => {
  return "articles/" + file + ".md";
};

export const loadMarkdown = (file) => {
  return fetch(buildUri(file))
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
