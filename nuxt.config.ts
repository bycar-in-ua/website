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
      tgBotUrl: process.env.TG_BOT_URL,
      isProduction: process.env.NODE_ENV === "production",
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
    provider: "google",
    defaults: {
      weights: [400, 500, 600, 700, 800],
    },
  },
});
