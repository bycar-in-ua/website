import general from "@bycar-in-ua/common/dist/translations/general.json";
import website from "@bycar-in-ua/common/dist/translations/website.json";
import vehicle from "@bycar-in-ua/common/dist/translations/vehicle.json";
import colors from "@bycar-in-ua/common/dist/translations/colors.json";

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
        home: "Головна",
        catalog: "Каталог",
      },
    },
  },
}));
