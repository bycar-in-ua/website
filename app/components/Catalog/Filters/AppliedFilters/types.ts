import type { VehiclesFiltersSchema } from "@bycar-in-ua/vehicles-sdk";

export type AppliedFilterProps = {
  filter: keyof VehiclesFiltersSchema;
  value: string | number;
};
