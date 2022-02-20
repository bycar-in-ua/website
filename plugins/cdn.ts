import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const cdnLink = (path: string, width: number = 0, height: number = 0) =>
    `${config.CDN_BASE}/${path}?size=${width}x${height}`;

  return {
    provide: {
      cdnLink,
    },
  };
});
