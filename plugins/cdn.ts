export type CdnLink = (path: string, width?: number, height?: number) => string;

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const cdnLink: CdnLink = (path, width = 0, height = 0) => {
    let cdnLink = config.public.cdnHost;

    if (width !== 0 && height !== 0) {
      cdnLink += `/fit-in/${width}x${height}`;
    }

    cdnLink += "/" + path;

    return cdnLink;
  };

  return {
    provide: {
      cdnLink,
    },
  };
});
