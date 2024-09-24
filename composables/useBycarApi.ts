export function useBycarApi() {
  const config = useRuntimeConfig();

  return $fetch.create({
    baseURL: config.public.apiHost,
  });
}
