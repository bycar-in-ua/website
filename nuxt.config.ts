export default defineNuxtConfig({
  extends: ["./layers/profile/nuxt.config.ts"],
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/fonts",
    "nuxt-gtag",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@sentry/nuxt/module",
    "nuxt-meta-pixel",
  ],
  devtools: { enabled: Boolean(process.env.NUXT_DEVTOOLS_ENABLED) },

  css: ["@/assets/css/global.css"],

  colorMode: {
    preference: "light",
    fallback: "light",
    storageKey: "bycar-color-theme",
  },

  runtimeConfig: {
    youtubeApiKey: process.env.YOUTUBE_API_KEY,

    public: {
      stage: process.env.STAGE ?? "dev",
      apiHost: process.env.API_URL,
      cdnHost: process.env.CDN_URL,
      sentryDsn: process.env.SENTRY_DSN,
      metapixel: process.env.META_PIXEL_ID
        ? { default: { id: process.env.META_PIXEL_ID } }
        : undefined,
      bycarChannelId: process.env.BYCAR_CHANNEL_ID,
      youtubeApiKey: process.env.YOUTUBE_API_KEY,
      tgBotToken: process.env.TG_BOT_TOKEN,
      tgLeadsChannelId: process.env.TG_LEADS_CHANNEL_ID,
    },
  },

  devServer: {
    port: 4000,
  },

  compatibilityDate: "2025-06-30",

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

  i18n: {
    defaultLocale: "ua",
    locales: ["ua"],
    strategy: "no_prefix",
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  pinia: {
    storesDirs: ["./stores/**", "./layers/**/stores/**"],
  },

  robots: {
    disallow: process.env.STAGE === "production" ? undefined : "/",
  },

  sentry: {
    sourceMapsUploadOptions: {
      enabled: false,
    },
    unstable_sentryBundlerPluginOptions: {
      telemetry: false,
    },
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
    cacheMaxAgeSeconds: 3600,
    autoI18n: false,
  },
});
