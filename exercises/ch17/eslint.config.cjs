const js = require("@eslint/js");
const prettier = require("eslint-config-prettier");
const globals = require("globals");

module.exports = [
  prettier,
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "13",
    },
    rules: {
      curly: ["error", "multi-line"], // cf: https://google.github.io/styleguide/jsguide.html#formatting-braces-all
      indent: ["error", 2], // cf: https://google.github.io/styleguide/jsguide.html#formatting-block-indentation
      semi: ["error", "always"], // cf: https://google.github.io/styleguide/jsguide.html#formatting-semicolons-are-required
      "max-len": ["error", { code: 80 }], // cf: https://google.github.io/styleguide/jsguide.html#formatting-column-limit
      "operator-linebreak": ["error", "after"], //cf: https://google.github.io/styleguide/jsguide.html#formatting-where-to-break
    },
  },
];
