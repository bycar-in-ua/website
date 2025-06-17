import { BrandPublicService } from "@bycar-in-ua/sdk";

let brandService: BrandPublicService;

export function useBrandService() {
  if (!brandService) {
    const config = useRuntimeConfig();

    brandService = BrandPublicService.create(config.public.apiHost);
  }

  return brandService;
}
