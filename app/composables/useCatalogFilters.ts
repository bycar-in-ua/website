import type { VehiclesFiltersSchema } from "@bycar-in-ua/vehicles-sdk";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { DEFAULT_FILTERS } from "~/utils/filters";

export function useCatalogFilters(initialFilters: VehiclesFiltersSchema = {}) {
  const vehiclesService = useVehiclesService();

  const selectedFilters = ref<VehiclesFiltersSchema>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const {
    data, isLoading, error,
  } = useQuery({
    queryKey: ["catalog-filters", selectedFilters],
    queryFn: () => vehiclesService.getFilters(selectedFilters.value),
    placeholderData: keepPreviousData,
  });

  return {
    data,
    isLoading,
    error,
    selectedFilters,
  };
}
