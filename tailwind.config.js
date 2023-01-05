/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxlmin: "1351px",
      xxlmax: { max: "1350px" },
    },
    fontFamily: {
      display: ["Quicksand", "sans-serif"],
      body: ["Quicksand", "sans-serif"],
    },
    borderWidth: {
      default: "1px",
      0: "0",
      2: "2px",
      4: "4px",
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: "",
            },
            "code::after": {
              content: "",
            },
          },
        },
      },
      colors: {
        cyan: "#9cdbff",
      },
      spacing: {
        70: "20rem",
        96: "24rem",
        128: "32rem",
      },
      height: {
        84: "22rem",
      },
      width: {
        "3/2": "150%",
        "4/2": "200%",
        "1/2-screen": "50vw",
      },
      margin: {
        "-fullh": "-100vh",
      },
    },
    inset: {
      0: 0,
      16: "16px",
      32: "32px",
      64: "64px",
      "2rem": "2rem",
      "3rem": "3rem",
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
