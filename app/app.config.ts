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
    slideover: {
      slots: {
        header: "min-h-14",
        overlay: "bg-black/20",
      },
    },
    drawer: {
      slots: {
        overlay: "bg-black/20",
        header: "px-4 pt-2 pb-4.5 sm:px-6",
      },
    },
    pinInput: {
      slots: {
        root: "border-b border-gray-200 gap-0",
        base: "shadow-none",
      },
      variants: {
        variant: { ghost: "hover:bg-transparent focus:bg-transparent" },
        size: { md: "w-4 h-8" },
      },
      defaultVariants: { variant: "ghost" },
    },
  },
});
