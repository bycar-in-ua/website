export default defineAppConfig({
  locale: {
    supportedLocales: ["ua"],
    fallbackLocale: "ua",
  },
  ui: {
    dropdownMenu: {
      slots: {
        content: "ring-gray-200",
        group: "px-4 py-1 divide-y divide-gray-100",
        item: "font-semibold",
      },
      variants: {
        active: {
          true: { item: "text-default before:bg-transparent" },
          false: { item: "text-gray-700" },
        },
        size: { md: { item: "px-0 py-2" } },
      },
    },
    input: { variants: { variant: { ghost: "hover:bg-transparent focus:bg-transparent hover:placeholder:text-gray-700 hover:text-primary" } } },
    selectMenu: { slots: { trailing: "pe-0! transition-all group-data-[state=open]:rotate-180" } },
  },
});
