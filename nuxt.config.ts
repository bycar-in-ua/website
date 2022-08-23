import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  build: {
    transpile: ["@heroicons/vue"],
    postcss: {
      postcssOptions: {
        plugins: {
          "tailwindcss/nesting": {},
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  app: {
    head: {
      title: "bycar.in.ua",
    },
  },
  css: ["@/assets/css/tailwind.css", "@/assets/css/global.css"],
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
      },
    ],
  ],
  runtimeConfig: {
    public: {
      API_BASE: process.env.API_URL,
      CDN_BASE: process.env.CDN_URL,
      SUPPORTED_LOCALES: process.env.SUPPORTED_LOCALES.split("|"),
      FALLBACK_LOCALE: process.env.FALLBACK_LOCALE,
    },
  },
});
