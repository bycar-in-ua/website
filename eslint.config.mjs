import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt()
  .override("nuxt/vue/rules", {
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
  })
  .override("nuxt/stylistic", {
    rules: {
      "@stylistic/operator-linebreak": [
        "warn",
        "after",
        { overrides: { "?": "before", ":": "before" } },
      ],
      "@stylistic/indent": ["error", { FunctionExpression: { parameters: 2 } }],
    },
  });
// Your custom configs here
