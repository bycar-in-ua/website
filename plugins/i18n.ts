import { defineNuxtPlugin, useRuntimeConfig, useCookie } from "#app";
import generalTranslations from "@/common/translations/general.json";
import vehicleTranslations from "@/common/translations/vehicle.json";
import colorsTranslations from "@/common/translations/colors.json";
import websiteTranslations from "@/common/translations/website.json";
import get from "lodash.get";

export type TranslationFunction = (
  path: string,
  options?: { pluralism?: number; fallback?: any },
) => string;

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const locale = useCookie("lang", {
    default: () => config.FALLBACK_LOCALE,
  });

  const translations = Object.fromEntries(
    config.SUPPORTED_LOCALES.map((l) => [
      l,
      {
        ...generalTranslations[l],
        ...websiteTranslations[l],
        vehicle: vehicleTranslations[l],
        colors: colorsTranslations[l],
      },
    ]),
  );

  const translate: TranslationFunction = (path, options = {}) => {
    const { pluralism = 1, fallback = path } = options;
    const translatable: string = get(translations[locale.value], path);

    if (!translatable) return fallback;

    if (translatable.indexOf("|") === -1) return translatable;

    const plurals = translatable.split(" | ");

    return plurals[pluralism - 1] ?? plurals[0];
  };

  return {
    provide: {
      translate,
      t: translate,
    },
  };
});
