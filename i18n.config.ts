import { general, vehicle, colors } from "@bycar-in-ua/sdk";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "ua",
  messages: {
    ua: {
      vehicle: vehicle.ua,
      colors: colors.ua,
      ...general.ua,
      menu: {
        home: "Головна",
        catalog: "Каталог",
      },
    },
  },
}));
