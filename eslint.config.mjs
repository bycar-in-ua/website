import { createConfigForNuxt } from "@nuxt/eslint-config/flat";
import importNewLines from "eslint-plugin-import-newlines";

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: {
      quotes: "double",
      semi: true,
      braceStyle: "1tbs",
      arrowParens: true,
    },
  },
  dirs: { pages: ["./app/pages", "./layers/**/pages"] },
})
  .append({
    name: "bycar/base",
    plugins: { "import-newlines": importNewLines },
    rules: {
      "@stylistic/object-curly-newline": [
        "error",
        {
          ObjectExpression: {
            multiline: true,
            minProperties: 3,
          },
          ObjectPattern: {
            multiline: true,
            minProperties: 3,
          },
          ImportDeclaration: {
            minProperties: 4,
            multiline: true,
            consistent: false,
          },
          ExportDeclaration: {
            multiline: true,
            minProperties: 3,
          },
        },
      ],
      "@stylistic/object-property-newline": ["error"],
      "import-newlines/enforce": ["warn", 3],
      "@stylistic/array-bracket-newline": [
        "warn",
        {
          multiline: true,
          minItems: 3,
        },
      ],
    },
  })
  .overrideRules({
    "@stylistic/member-delimiter-style": [
      "warn",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: true,
        },
        multilineDetection: "brackets",
      },
    ],
    "vue/max-attributes-per-line": [
      "warn",
      {
        singleline: 3,
        multiline: { max: 1 },
      },
    ],
  });
