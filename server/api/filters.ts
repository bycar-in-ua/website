import type { BrandDto } from "@bycar-in-ua/common";
import { useBycarApi } from "~/composables/useBycarApi";

export default defineEventHandler(() => {
  const bycarApi = useBycarApi();

  return bycarApi<{ brands: BrandDto[]; bodyTypes: string[] }>(
    "/website/catalog",
  );
});
