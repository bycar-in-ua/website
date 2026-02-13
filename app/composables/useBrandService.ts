import { BrandPublicService, getBycarFetchClient } from "@bycar-in-ua/brands-sdk";

let brandService: BrandPublicService;

export function useBrandService() {
  if (!brandService) {
    const config = useRuntimeConfig();

    const client = getBycarFetchClient(config.public.brandsApiHost);

    brandService = new BrandPublicService(client);
  }

  return brandService;
}
