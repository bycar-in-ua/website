import { joinURL } from "ufo";
import type { ProviderGetImage } from "@nuxt/image";

export const getImage: ProviderGetImage = (src, ctx) => {
  const { modifiers, baseURL } = ctx;

  let fitParam = "";

  if (modifiers?.width || modifiers?.height) {
    fitParam = `/fit-in/${modifiers.width ?? 0}x${modifiers.height ?? 0}`;
  }

  return {
    url: joinURL(baseURL, fitParam, src),
  };
};
