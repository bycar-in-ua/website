export default defineAppConfig({
  locale: {
    supportedLocales: ["ua"],
    fallbackLocale: "ua",
  },
  ui: {
    colors: {
      primary: "primary",
      secondary: "secondary",
      white: "white",
    },
    button: {
      slots: { base: "cursor-pointer" },
      compoundVariants: [
        {
          color: "secondary",
          variant: "solid",
          class: "text-gray-950",
        },
      ],
    },
    input: { variants: { size: { xl: { base: "px-3.5 py-2.5" } } } },
  },
});
