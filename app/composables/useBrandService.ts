import { BrandPublicService, getBycarFetchClient, getApiHost } from "@bycar-in-ua/brands-sdk";

let brandService: BrandPublicService;

export function useBrandService() {
  if (!brandService) {
    const config = useRuntimeConfig();

    const client = getBycarFetchClient(getApiHost(config.public.stage));

    brandService = new BrandPublicService(client);
  }

  return brandService;
}
