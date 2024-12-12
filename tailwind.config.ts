import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        "bycar-primary": {
          50: "#d9cdff",
          100: "#bfa6ff",
          200: "#a273ff",
          300: "#883bff",
          400: "#7e14ff",
          500: "#7000ff",
          600: "#5f01d6",
          700: "#4e03af",
          800: "#4e03af",
          900: "#4e03af",
          950: "#4e03af",
        },
        "bycar-secondary": {
          DEFAULT: "#d7e903",
          50: "#fffee5",
          100: "#fffec6",
          200: "#feff93",
          300: "#f8ff55",
          400: "#ecf922",
          500: "#d7e903",
          600: "#a1b300",
          700: "#798704",
          800: "#5e6a0a",
          900: "#4f5a0d",
          950: "#2a3201",
        },
      },
      container: {
        center: true,
        padding: "1.25rem",
        screens: {
          // eslint-disable-next-line @stylistic/quote-props
          xl: "1120px",
          "2xl": "1120px",
        },
      },
      fontFamily: {
        sans: ["Golos Text"],
      },
      screens: {
        xs: "520px",
      },
    },
  },
  plugins: [typography],
};
