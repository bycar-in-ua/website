import type {
  VehicleView as Car,
  BrandDto as Brand,
} from "@bycar-in-ua/common";
import { useBycarApi } from "~/composables/useBycarApi";

type ResponseType = {
  recentVehicles: Car[];
  establishedBrands: Brand[];
};

export default defineEventHandler(() => {
  const bycarApi = useBycarApi();

  return bycarApi<ResponseType>("/website/home");
});
