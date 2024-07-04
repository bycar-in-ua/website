import { defineNuxtPlugin } from "#app";
// import {
//   general,
//   colors,
//   vehicle,
//   website,
// } from "@bycar-in-ua/common/dist/translations/index.js";

// import get from "lodash/get.js";

export type TranslationFunction = (
  path: string,
  options?: { pluralism?: number; fallback?: any },
) => string;

export default defineNuxtPlugin(() => {
  // const appConfig = useAppConfig();

  // const locale = "ua";

  // const translations = Object.fromEntries(
  //   (appConfig.locale.supportedLocales as ["ua"]).map((l) => [
  //     l,
  //     {
  //       ...general[l],
  //       ...website[l],
  //       vehicle: vehicle[l],
  //       colors: colors[l],
  //     },
  //   ]),
  // );

  const translate: TranslationFunction = (path, options = {}) => {
    return path;

    // const { pluralism = 1, fallback = path } = options;
    // const translatable: string = get(translations[locale], path);

    // if (!translatable) return fallback;

    // if (translatable.indexOf("|") === -1) return translatable;

    // const plurals = translatable.split(" | ");

    // return plurals[pluralism - 1] ?? plurals[0];
  };

  return {
    provide: {
      translate,
      t: translate,
    },
  };
});
