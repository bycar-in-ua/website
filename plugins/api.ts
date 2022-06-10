import { defineNuxtPlugin, useRuntimeConfig, useFetch, AsyncData } from "#app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  async function get<ResponseType = any>(endpoind: string) {
    return await useFetch<ResponseType>(endpoind, {
      baseURL: config.API_BASE,
    });
  }

  return {
    provide: {
      api: {
        get,
      },
    },
  };
});
