import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import type { AvailableVehiclesFiltersSchema } from "@bycar-in-ua/vehicles-sdk";
import {
  parseFiltersFromQuery,
  serializeFiltersToQuery,
  countFilters,
  DEFAULT_MODELS_FILTERS,
} from "~/utils/filters";
import { filtersKey, type FiltersAPI } from "./useFilters";
import { useQueryStringPagination } from "./useQueryStringPagination";

export function useAvailableCatalogFiltersProvider() {
  const route = useRoute();

  const selectedFilters = ref<AvailableVehiclesFiltersSchema>({
    ...DEFAULT_AVAILABLE_FILTERS,
    ...parseFiltersFromQuery(route.query),
  });
  const selectedFiltersCount = computed(() => countFilters(selectedFilters.value));

  const removeSelectedFilter: FiltersAPI["removeSelectedFilter"] = (key, value) => {
    const target = selectedFilters.value[key as keyof AvailableVehiclesFiltersSchema];

    if (!target) {
      return;
    }

    if (target && Array.isArray(target)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      selectedFilters.value[key] = target.filter((item) => item !== value);
      return;
    }

    selectedFilters.value[key as keyof AvailableVehiclesFiltersSchema] = undefined;
  };

  const resetSelectedFilters = () => {
    selectedFilters.value = { ...appliedFilters.value };
  };

  const vehiclesService = useVehiclesService();

  const {
    data, isLoading, error,
  } = useQuery({
    queryKey: ["available-catalog-filters", selectedFilters],
    queryFn: () => vehiclesService.getAvailableVehicleFilters(selectedFilters.value),
    placeholderData: keepPreviousData,
  });

  const appliedFilters = ref<AvailableVehiclesFiltersSchema>({ ...selectedFilters.value });
  const appliedFiltersCount = computed(() => countFilters(appliedFilters.value));

  const router = useRouter();

  const pagination = useQueryStringPagination();

  const applyFilters = () => {
    appliedFilters.value = { ...selectedFilters.value };

    const filterQuery = serializeFiltersToQuery(selectedFilters.value);
    router.replace({ query: { ...filterQuery } });
    pagination.value.page = 1;
  };

  const clearFilters = () => {
    selectedFilters.value = { ...DEFAULT_MODELS_FILTERS };
    applyFilters();
  };

  const api: FiltersAPI = {
    data,
    isLoading,
    error,

    selectedFilters,
    selectedFiltersCount,
    removeSelectedFilter,
    resetSelectedFilters,

    appliedFilters,
    appliedFiltersCount,
    pagination,

    applyFilters,
    clearFilters,
  };

  provide(filtersKey, api);

  return api;
}
