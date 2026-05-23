import type { VehiclesFiltersResponse, AvailableVehiclesFiltersResponse } from "@bycar-in-ua/vehicles-sdk";
import type { CheckboxGroupItem } from "@nuxt/ui";

export type CheckboxGroupItemWithCount = CheckboxGroupItem
  & {
    label: string;
    count: number;
  };

export type Filters = VehiclesFiltersResponse["filters"] & AvailableVehiclesFiltersResponse["filters"];

export type FiltersKeys = keyof VehiclesFiltersResponse["filters"] | keyof AvailableVehiclesFiltersResponse["filters"];

export type FilterListItem = {
  label: string;
  count: number;
  value: string;
  disabled?: boolean;
};

export interface BaseFilterDefinition {
  key: FiltersKeys;
  label: string;
};

export interface ListFilterDefinition extends BaseFilterDefinition {
  options: FilterListItem[];
  type: "checkbox" | "radio";
}

export interface RangeFilterDefinition extends BaseFilterDefinition {
  type: "range";
}

export type FilterDefinition = ListFilterDefinition | RangeFilterDefinition;
