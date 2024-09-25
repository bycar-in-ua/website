import type {
  VehicleView,
  BrandDto,
  PaginationMeta,
} from "@bycar-in-ua/common";
import { useBycarApi } from "~/composables/useBycarApi";

type ResponseType = {
  recentVehicles: VehicleView[];
  establishedBrands: BrandDto[];
};

export default defineEventHandler(async (): Promise<ResponseType> => {
  const bycarApi = useBycarApi();

  const [{ items: recentVehicles }, establishedBrands] = await Promise.all([
    bycarApi<{ items: VehicleView[]; meta: PaginationMeta }>("/vehicles", {
      query: {
        limit: "8",
      },
    }),
    bycarApi<BrandDto[]>("/brands"),
  ]);

  return { recentVehicles, establishedBrands };
});
