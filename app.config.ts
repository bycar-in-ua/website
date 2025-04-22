export default defineAppConfig({
  locale: {
    supportedLocales: ["ua"],
    fallbackLocale: "ua",
  },
  ui: {
    colors: {
      primary: "primary",
      secondary: "secondary",
    },
    button: {
      slots: {
        base: "cursor-pointer",
      },
    },
  },
});
