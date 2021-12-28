module.exports = {
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [`"Source Sans Pro"`, "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#393BE7",
        accent: "#FFB016",
        "body-bg": "#F9FBFF",
        "main-color": "#2B2B2B",
        "subtext-color": "#83839A",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
