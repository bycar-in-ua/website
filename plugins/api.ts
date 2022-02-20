import { defineNuxtPlugin, useRuntimeConfig, useFetch } from "#app";
import type { AsyncData } from "#app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  function get<ResponseType = any>(endpoind: string): AsyncData<ResponseType> {
    return useFetch<string, ResponseType, any>(endpoind, {
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
