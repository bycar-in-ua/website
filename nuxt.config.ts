export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ["@/assets/css/global.css"],

  devServer: {
    port: 4000,
  },

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
  ],

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
      },
    },
  },

  compatibilityDate: "2024-07-02",
});
