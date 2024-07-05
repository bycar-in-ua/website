import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        "bycar-primary": {
          50: "#d1f0ff",
          100: "#a8d2f9",
          200: "#81a9f2",
          300: "#5c76ec",
          400: "#393be7",
          500: "#2738b9",
          600: "#193491",
          700: "#0f2e6e",
          800: "#082852",
          900: "#04203a",
          950: "#011926",
        },
      },
    },
  },
};
