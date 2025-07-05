import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt()
  .override("nuxt/vue/rules", {
    rules: {
      "vue/max-attributes-per-line": [
        "warn",
        {
          singleline: {
            max: 4,
          },
        },
      ],
      "vue/html-self-closing": ["off"],
      "vue/singleline-html-element-content-newline": ["off"],
    },
  })
  .override("nuxt/stylistic", {
    rules: {
      "@stylistic/operator-linebreak": [
        "warn",
        "after",
        { overrides: { "?": "before", ":": "before" } },
      ],
      "@stylistic/indent": [
        "error",
        2,
        {
          FunctionExpression: { parameters: "off" },
          SwitchCase: 1,
          offsetTernaryExpressions: true,
        },
      ],
      "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
    },
  })
  .override("nuxt/import/rules", {
    files: ["*.vue"],
    rules: {
      "import/first": "off",
    },
  });
