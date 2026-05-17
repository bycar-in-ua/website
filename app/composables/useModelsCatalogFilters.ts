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

  const removeFilter = (key: keyof VehiclesFiltersSchema, value?: string | number) => {
    const target = selectedFilters.value[key];

    if (!target) {
      return;
    }

    if (target && Array.isArray(target)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      selectedFilters.value[key] = target.filter((item) => item !== value);
      return;
    }

    selectedFilters.value[key] = undefined;
  };

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
    removeFilter,
    data,
    isLoading,
    error,
    suspense,
  };
}
