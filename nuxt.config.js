import crypto from "crypto"

// Patch for webpack4 on nodejs 17+
const origCreateHash = crypto.createHash
crypto.createHash = (algorithm) =>
  origCreateHash(algorithm === "md4" ? "sha256" : algorithm)

export default {
  telemetry: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "Bitcart Blog",
    titleTemplate: "%s - Bitcart Official Blog",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Bitcart Official Blog",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Global CSS
   */
  css: ["@/assets/css/main.css"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [{ src: "~/plugins/vue-matomo.js", ssr: false }],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  publicRuntimeConfig: {
    matomoURL: process.env.MATOMO_URL || "",
    matomoID: parseInt(process.env.MATOMO_ID || "1"),
    matomoScriptURL: process.env.MATOMO_SCRIPT_URL || "",
    matomoActions: process.env.MATOMO_ACTIONS || "",
  },
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt/content
    "@nuxt/content",
  ],
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    markdown: {
      prism: {
        theme: "prism-themes/themes/prism-material-oceanic.css",
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, ctx) {},
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
}
