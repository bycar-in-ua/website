import type { VehiclesSearchSchema } from "@bycar-in-ua/sdk";

export type FiltersState = Omit<
  NonNullable<VehiclesSearchSchema["filters"]>,
  "status" | "price"
> & {
  priceFrom?: number;
  priceTo?: number;
};
