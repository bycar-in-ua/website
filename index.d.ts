import type { CdnLink } from "./plugins/cdn";
import type { TranslationFunction } from "./plugins/i18n";

declare module "#app" {
  interface NuxtApp {
    $cdnLink: CdnLink;
    $translate: TranslationFunction;
    $t: TranslationFunction;
  }
}

type SupportedLocale = "ua";

declare module "nuxt/schema" {
  interface AppConfig {
    locale: {
      supportedLocales: SupportedLocale[];
      fallbackLocale: SupportedLocale;
    };
  }
}

export {};
