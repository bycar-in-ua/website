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
    input: {
      variants: {
        size: {
          xl: {
            base: "px-3.5 py-2.5",
          },
        },
      },
    },
  },
});
