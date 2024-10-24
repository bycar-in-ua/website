export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/fonts",
  ],
  devtools: { enabled: true },

  css: ["@/assets/css/global.css"],

  colorMode: {
    preference: "light",
  },

  runtimeConfig: {
    public: {
      apiHost: process.env.API_URL,
      cdnHost: process.env.CDN_URL,
    },
  },

  devServer: {
    port: 4000,
  },

  compatibilityDate: "2024-07-02",

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

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700, 800],
    },
  },
});
