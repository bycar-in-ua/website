import { defineNuxtConfig } from "nuxt3";

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
});
