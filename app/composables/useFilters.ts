import type { InjectionKey } from "vue";
import type { AvailableVehiclesFiltersResponse, PaginationSchema, VehiclesFiltersResponse } from "@bycar-in-ua/vehicles-sdk";
import type { FiltersKeys, UnifiedFiltersSchema } from "~/utils/filters";

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
