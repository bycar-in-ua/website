import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export type CdnLink = (path: string, width?: number, height?: number) => string;

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const cdnLink: CdnLink = (path, width = 0, height = 0) =>
    `${config.CDN_BASE}/${path}?size=${width}x${height}`;

  return {
    provide: {
      cdnLink,
    },
  };
});
