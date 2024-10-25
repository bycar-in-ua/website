import { BycarPublicApi } from "@bycar-in-ua/sdk";
import { ofetch } from "ofetch";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const bycarApi = new BycarPublicApi(
    { apiHost: config.public.apiHost },
    ofetch,
  );

  return {
    provide: {
      bycarApi,
    },
  };
});
