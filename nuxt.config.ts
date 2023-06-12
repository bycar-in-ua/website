export default defineNuxtConfig({
  // build: {
  //   transpile: ["@heroicons/vue"],
  // },
  postcss: {
    plugins: {
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devServer: {
    port: 4000,
  },
  app: {
    head: {
      title: "bycar.in.ua",
    },
  },
  css: ["@/assets/css/tailwind.css", "@/assets/css/global.css"],
  modules: [["@pinia/nuxt", { autoImports: ["defineStore"] }]],
  runtimeConfig: {
    public: {
      API_BASE: process.env.API_URL,
      CDN_BASE: process.env.CDN_URL,
      SUPPORTED_LOCALES: ["ua"],
      FALLBACK_LOCALE: process.env.FALLBACK_LOCALE,
    },
  },
});
