module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: [
    "@nuxtjs",
    "plugin:nuxt/recommended",
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    semi: [2, "never"],
    "no-console": "off",
    "prettier/prettier": ["error", { semi: false }],
    "vue/html-self-closing": 0,
    "vue/singleline-html-element-content-newline": 0,
  },
}
