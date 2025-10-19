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
      slots: { base: "cursor-pointer rounded-none uppercase" },
      compoundVariants: [
        {
          color: "secondary",
          variant: "solid",
          class: "text-gray-950",
        },
      ],
    },
    input: {
      slots: { base: "rounded-none w-full" },
      variants: { size: { md: { base: "px-0" } } },
    },
    select: {
      slots: {
        base: "rounded-none w-full cursor-pointer",
        content: "ring-0",
      },
      variants: {
        size: {
          md: {
            base: "px-0 py-0",
            trailing: "pe-0",

          },
        },
        variant: {
          outline: "ring-0 border-b border-default py-0",
          ghost: "hover:bg-default focus:bg-default",
        },
      },
    },
    formField: { slots: { label: "uppercase font-semibold" } },
  },
});
