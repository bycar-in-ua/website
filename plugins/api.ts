export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const ofetch = $fetch.create({
    baseURL: config.public.apiHost,
  });

  const get = <TResponse>(endpoint: string) => {
    return ofetch<TResponse>(endpoint, {
      method: "GET",
    });
  };

  return {
    provide: {
      api: {
        get,
      },
    },
  };
});
