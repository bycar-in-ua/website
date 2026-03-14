export default defineNuxtConfig({
  extends: [
    "./layers/auth", "./layers/profile", "./layers/quiz",
  ],

  modules: [
    "@bycar-in-ua/base-nuxt-module",
    "nuxt-auth-utils",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "nuxt-gtag",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@sentry/nuxt/module",
    "nuxt-meta-pixel",
  ],

  devtools: { enabled: Boolean(process.env.NUXT_DEVTOOLS_ENABLED) },

  css: ["~/assets/css/global.css"],

  colorMode: { preference: "light" },

  runtimeConfig: {
    youtubeApiKey: process.env.YOUTUBE_API_KEY,
    oauth: {
      google: {
        clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
      },
    },

    session: { password: String(process.env.NUXT_SESSION_PASSWORD) },

    public: {
      stage: process.env.STAGE ?? "dev",
      session: { maxAge: 60 * 60 * 24 * 7 },
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

  compatibilityDate: "2025-09-14",

  typescript: { includeWorkspace: true },

  bycar: {
    config: {
      apiHost: process.env.API_URL,
      cdnHost: process.env.CDN_URL,
    },
  },

  eslint: { config: { stylistic: true } },

  fonts: {
    provider: "google",
    defaults: {
      weights: [
        400, 500, 600, 700, 800,
      ],
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
  },

  pinia: { storesDirs: ["./app/stores/**", "./layers/**/stores/**"] },

  robots: { disallow: process.env.STAGE === "production" ? undefined : "/" },

  sentry: {
    sourceMapsUploadOptions: { enabled: false },
    unstable_sentryBundlerPluginOptions: { telemetry: false },
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
    cacheMaxAgeSeconds: 3600,
    autoI18n: false,
  },
});
