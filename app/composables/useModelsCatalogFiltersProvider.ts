import type { VehiclesFiltersSchema } from "@bycar-in-ua/vehicles-sdk";
import {
  parseFiltersFromQuery,
  serializeFiltersToQuery,
  countFilters,
  DEFAULT_MODELS_FILTERS,
} from "~/utils/filters";
import { filtersKey, type FiltersAPI } from "./useFilters";
import { useQueryStringPagination } from "./useQueryStringPagination";
import { useModelsCatalogFilters } from "./useModelsCatalogFilters";

export function useModelsCatalogFiltersProvider() {
  const router = useRouter();
  const route = useRoute();

  const {
    data, isLoading, error, selectedFilters, selectedFiltersCount,
  } = useModelsCatalogFilters({
    ...DEFAULT_MODELS_FILTERS,
    ...parseFiltersFromQuery(route.query),
  });

  const removeSelectedFilter: FiltersAPI["removeSelectedFilter"] = (key, value) => {
    const target = selectedFilters.value[key as keyof VehiclesFiltersSchema];

    if (!target) {
      return;
    }

    if (target && Array.isArray(target)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      selectedFilters.value[key] = target.filter((item) => item !== value);
      return;
    }

    selectedFilters.value[key as keyof VehiclesFiltersSchema] = undefined;
  };

  const resetSelectedFilters = () => {
    selectedFilters.value = { ...appliedFilters.value };
  };

  const appliedFilters = ref<VehiclesFiltersSchema>({ ...selectedFilters.value });
  const appliedFiltersCount = computed(() => countFilters(appliedFilters.value));

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
