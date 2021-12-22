module.exports = {
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#393BE7",
        accent: "#FFB016",
        "body-bg": "#F9FBFF",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
