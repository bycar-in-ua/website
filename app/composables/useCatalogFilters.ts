import type { VehiclesFiltersSchema } from "@bycar-in-ua/vehicles-sdk";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";

export function useCatalogFilters(initialFilters: VehiclesFiltersSchema = {}) {
  const vehiclesService = useVehiclesService();

  const selectedFilters = ref<VehiclesFiltersSchema>({ ...initialFilters });

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
