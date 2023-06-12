export type TranslationFunction = (
  path: string,
  options?: { pluralism?: number; fallback?: any },
) => string;

export default defineNuxtPlugin(() => {
  const translate: TranslationFunction = (path, options = {}) => {
    return "rework i18n";
  };

  return {
    provide: {
      translate,
      t: translate,
    },
  };
});
