import type { VehiclesFiltersSchema } from "@bycar-in-ua/vehicles-sdk";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { DEFAULT_FILTERS } from "~/utils/filters";

export function useModelsCatalogFilters(initialFilters: VehiclesFiltersSchema = {}) {
  const vehiclesService = useVehiclesService();

  const selectedFilters = ref<VehiclesFiltersSchema>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const selectedFiltersCount = computed(() => Object.values(selectedFilters.value)
    .reduce((acc, curr) => {
      if (curr) {
        if (Array.isArray(curr)) {
          acc.count += curr.length;
        } else {
          acc.count += 1;
        }
      }

      return acc;
    }, { count: 0 }).count,
  );

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
    queryFn: () => vehiclesService.getFilters(selectedFilters.value),
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
