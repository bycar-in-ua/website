import type { VehiclesFiltersResponse, AvailableVehiclesFiltersResponse } from "@bycar-in-ua/vehicles-sdk";
import type { CheckboxGroupItem } from "@nuxt/ui";

export type CheckboxGroupItemWithCount = CheckboxGroupItem
  & {
    label: string;
    count: number;
  };

export type Filters = VehiclesFiltersResponse["filters"] | AvailableVehiclesFiltersResponse["filters"];

export type FiltersKeys = keyof VehiclesFiltersResponse["filters"] | keyof AvailableVehiclesFiltersResponse["filters"];
