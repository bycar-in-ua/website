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
      compoundVariants: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        color: "secondary",
        variant: "solid",
        class: "text-gray-950",
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
