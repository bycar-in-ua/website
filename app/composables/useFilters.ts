import type { InjectionKey } from "vue";
import type {
  AvailableVehiclesFiltersResponse,
  AvailableVehiclesFiltersSchema,
  PaginationSchema,
  VehiclesFiltersResponse,
  VehiclesFiltersSchema,
} from "@bycar-in-ua/vehicles-sdk";

type UnifiedFilters = VehiclesFiltersSchema & AvailableVehiclesFiltersSchema;

export interface FiltersAPI {
  data: Readonly<Ref<VehiclesFiltersResponse | AvailableVehiclesFiltersResponse | undefined>>;
  isLoading: Readonly<Ref<boolean | undefined>>;
  error: Readonly<Ref<Error | null>>;

  selectedFilters: Ref<UnifiedFilters>;
  selectedFiltersCount: ComputedRef<number>;
  removeSelectedFilter: (filter: keyof UnifiedFilters, value?: string | number) => void;
  resetSelectedFilters: () => void;

  appliedFilters: Ref<UnifiedFilters>;
  appliedFiltersCount: ComputedRef<number>;
  pagination: WritableComputedRef<PaginationSchema>;

  applyFilters: () => void;
  clearFilters: () => void;
}

export const filtersKey = Symbol("filters") as InjectionKey<FiltersAPI>;

export function useFilters(): FiltersAPI {
  const filtersStore = inject(filtersKey);

  if (!filtersStore) {
    throw new Error("useFilters must be used within a component with a filters store");
  }

  return filtersStore;
}
