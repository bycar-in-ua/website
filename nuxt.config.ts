import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  build: {
    transpile: ["seemly", "naive-ui", "treemate", "vueuc", "vdirs"],
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
