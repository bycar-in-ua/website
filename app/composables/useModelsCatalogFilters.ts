import type { VehiclesFiltersSchema } from "@bycar-in-ua/vehicles-sdk";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { DEFAULT_MODELS_FILTERS, countFilters } from "~/utils/filters";

export function useModelsCatalogFilters(initialFilters: VehiclesFiltersSchema = {}) {
  const vehiclesService = useVehiclesService();

  const selectedFilters = ref<VehiclesFiltersSchema>({
    ...DEFAULT_MODELS_FILTERS,
    ...initialFilters,
  });

  const selectedFiltersCount = computed(() => countFilters(selectedFilters.value));

  const {
    data, isLoading, error, suspense,
  } = useQuery({
    queryKey: ["catalog-filters", selectedFilters],
    queryFn: () => vehiclesService.getVehiclesFilters(selectedFilters.value),
    placeholderData: keepPreviousData,
  });

  return {
    selectedFilters,
    selectedFiltersCount,
    data,
    isLoading,
    error,
    suspense,
  };
}
