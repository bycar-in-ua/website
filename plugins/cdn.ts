export type CdnLink = (path: string, width?: number, height?: number) => string;

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const cdnLink: CdnLink = (path, width = 0, height = 0) => {
    return `${config.public.API_BASE}/${path}?size=${width}x${height}`;
  };

  return {
    provide: {
      cdnLink,
    },
  };
});
