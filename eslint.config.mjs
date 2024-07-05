// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt().override("nuxt/vue/rules", {
  rules: {
    "vue/max-attributes-per-line": [
      "warn",
      {
        singleline: {
          max: 3,
        },
      },
    ],
    "vue/html-self-closing": ["off"],
  },
});
// Your custom configs here
