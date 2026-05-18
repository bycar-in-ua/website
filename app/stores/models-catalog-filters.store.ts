import { defineStore } from "pinia";
import { useModelsCatalogFilters } from "~/composables/useModelsCatalogFilters";
import type { VehiclesFiltersSchema } from "@bycar-in-ua/vehicles-sdk";
import { useQueryStringPagination } from "~/composables/useQueryStringPagination";
import {
  parseFiltersFromQuery,
  serializeFiltersToQuery,
  countFilters,
  DEFAULT_MODELS_FILTERS,
} from "~/utils/filters";

export const useModelsCatalogFiltersStore = defineStore("models-catalog-filters", () => {
  const router = useRouter();
  const route = useRoute();

  const {
    data, isLoading, error, selectedFilters, selectedFiltersCount, removeFilter,
  } = useModelsCatalogFilters({
    ...DEFAULT_MODELS_FILTERS,
    ...parseFiltersFromQuery(route.query),
  });

  const appliedFilters = ref<VehiclesFiltersSchema>({ ...selectedFilters.value });

  const appliedFiltersCount = computed(() => countFilters(appliedFilters.value));

  const pagination = useQueryStringPagination();

  const applyFilters = () => {
    appliedFilters.value = { ...selectedFilters.value };

    const filterQuery = serializeFiltersToQuery(selectedFilters.value);
    router.replace({ query: { ...filterQuery } });
    pagination.value.page = 1;
  };

  const resetFilters = () => {
    selectedFilters.value = { ...appliedFilters.value };
  };

  const clearFilters = () => {
    selectedFilters.value = { ...DEFAULT_MODELS_FILTERS };
    applyFilters();
  };

  return {
    data,
    selectedFilters,
    selectedFiltersCount,
    appliedFilters,
    appliedFiltersCount,
    pagination,

    isLoading,
    error,

    applyFilters,
    removeFilter,
    clearFilters,
    resetFilters,
  };
});
