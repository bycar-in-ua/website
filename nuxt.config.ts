import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  build: {
    transpile: [],
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
  css: ["@/assets/css/tailwind.css", "@/assets/css/global.css"],
  buildModules: ["@pinia/nuxt"],
  publicRuntimeConfig: {
    API_BASE: process.env.API_URL,
    CDN_BASE: process.env.CDN_URL,
  },
});
