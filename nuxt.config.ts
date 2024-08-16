export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ["@/assets/css/global.css"],

  devServer: {
    port: 4000,
  },

  colorMode: {
    preference: "light",
  },

  modules: ["@pinia/nuxt", "@nuxtjs/i18n", "@nuxt/eslint", "@nuxt/ui"],

  runtimeConfig: {
    public: {
      apiHost: process.env.API_URL,
      cdnHost: process.env.CDN_URL,
    },
  },

  eslint: {
    config: {
      stylistic: {
        quotes: "double",
        semi: true,
        braceStyle: "1tbs",
        arrowParens: true,
      },
    },
  },

  compatibilityDate: "2024-07-02",
});
