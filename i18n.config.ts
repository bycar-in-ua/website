import { general, website, vehicle, colors } from "@bycar-in-ua/common";

console.log(website.ua);

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "ua",
  messages: {
    ua: {
      vehicle: vehicle.ua,
      colors: colors.ua,
      ...general.ua,
      ...website.ua,
      menu: {
        home: 'Головна',
        catalog: 'Каталог'
      }
    },
  },
}));
