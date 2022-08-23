import { defineNuxtPlugin, useRuntimeConfig, useAsyncData } from "#app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const get = async <ResponseType = any>(endpoind: string) => {
    return await useAsyncData(endpoind, () =>
      $fetch<ResponseType>(endpoind, {
        baseURL: config.API_BASE,
      }),
    );
  };

  return {
    provide: {
      api: {
        get,
      },
    },
  };
});
