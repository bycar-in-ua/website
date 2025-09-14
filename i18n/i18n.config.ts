import {
  general,
  vehicle,
  colors,
  options,
} from "@bycar-in-ua/sdk";

export default defineI18nConfig(() => ({
  locale: "ua",
  messages: {
    ua: {
      vehicle: vehicle.ua,
      colors: colors.ua,
      options: options.ua,
      ...general.ua,
      menu: {
        home: "Головна",
        catalog: "Каталог",
        catalogAuto: "Каталог автомобілів",
        about: "Про нас",
      },
      filters: {
        title: "Фільтри",
        clearAll: "Очистити всі",
        engineType: {
          title: "Тип двигуна",
          gas: "Бензин",
          dt: "Дизель",
          hybrid: "Гібрид",
          electric: "Електро",
        },
        drive: {
          title: "Тип приводу",
          FWD: "Передній привід",
          RWD: "Задній привід",
          AWD: "Повний привід",
        },
        price: {
          priceFrom: "Ціна від",
          priceTo: "Ціна до",
        },
      },
      orders: {
        "price-asc": "За ціною: від дешевших",
        "price-desc": "За ціною: від дорожчих",
        "yearFrom-desc": "За роком: від новіших",
        "yearFrom-asc": "За роком: від старших",
      },
      catalog: { title: "Каталог авто" },
      recentCars: "Нові авто у каталозі",
      brands: "Представлені бренди",
      complectationOptions: "Опції комплектації",
      powerUnits: "Доступні силові агрегати",
      emptyCatalog: "Автомобілів за вашим запитом не знайдено",
      copyright: "Всі права захищено.",
      pagination: {
        prev: "Попередня сторінка",
        next: "Наступна сторінка",
      },
      gallery: { toggleFullScreen: "Відкрити на весь екран (\"F\" на клавіатурі)" },
    },
  },
}));
