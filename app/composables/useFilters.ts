import type { InjectionKey } from "vue";
import type {
  AvailableVehiclesFiltersResponse,
  AvailableVehiclesFiltersSchema,
  PaginationSchema,
  VehiclesFiltersResponse,
  VehiclesFiltersSchema,
} from "@bycar-in-ua/vehicles-sdk";
import type { FiltersKeys } from "~/components/Catalog/Filters/types";

export type UnifiedFiltersSchema = VehiclesFiltersSchema & AvailableVehiclesFiltersSchema;

export interface FiltersAPI {
  data: Readonly<Ref<VehiclesFiltersResponse | AvailableVehiclesFiltersResponse | undefined>>;
  isLoading: Readonly<Ref<boolean | undefined>>;
  error: Readonly<Ref<Error | null>>;

  selectedFilters: Ref<UnifiedFiltersSchema>;
  selectedFiltersCount: ComputedRef<number>;
  removeSelectedFilter: (filter: keyof UnifiedFiltersSchema, value?: string | number) => void;
  resetSelectedFilters: () => void;

  appliedFilters: Ref<UnifiedFiltersSchema>;
  appliedFiltersCount: ComputedRef<number>;
  pagination: WritableComputedRef<PaginationSchema>;

  applyFilters: () => void;
  clearFilters: () => void;

  responsiveFilterView: Ref<FiltersKeys | undefined>;
}

export const filtersKey = Symbol("filters") as InjectionKey<FiltersAPI>;

export function useFilters(): FiltersAPI {
  const filtersStore = inject(filtersKey);

  if (!filtersStore) {
    throw new Error("useFilters must be used within a component with a filters store");
  }

  return filtersStore;
}
