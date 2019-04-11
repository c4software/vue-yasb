import marked from "../../web_modules/marked/marked.min.js";
import Prism from "../../web_modules/prismjs/prism.js";
import { articlesFolder } from "../config.js";

const buildUri = file => {
  return articlesFolder + file + ".md";
};

const highlightCode = (code, lang) => {
  // Injecting « pre », make the highlighting works with PrismJS
  // Ugly… but working
  try {
    return `<pre class='language-${lang}'>${Prism.highlight(code, Prism.languages[lang || "markup"])}</pre>`;
  } catch (err) {
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
  return marked(content, { highlight: highlightCode });
};

const handleErrors = response => {
  if (!response.ok) {
    throw response;
  } else {
    return response;
  }
};
