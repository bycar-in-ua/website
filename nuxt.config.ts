export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/fonts",
    "nuxt-gtag",
    "@nuxt/image",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
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

  gtag: {
    enabled: !!process.env.GTAG_ID,
    id: process.env.GTAG_ID,
  },

  image: {
    providers: {
      bycar: {
        name: "bycar",
        provider: "~/providers/bycar-cdn.ts",
        options: {
          baseURL: process.env.CDN_URL,
        },
      },
    },
  },

  robots: {
    disallow: process.env.STAGE === "production" ? undefined : "/",
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
    includeAppSources: true,
    cacheMaxAgeSeconds: 3600,
  },
});
