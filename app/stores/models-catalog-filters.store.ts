import { defineStore } from "pinia";
import { useModelsCatalogFilters } from "~/composables/useModelsCatalogFilters";
import type { VehiclesFiltersSchema } from "@bycar-in-ua/vehicles-sdk";
import { useQueryStringPagination } from "~/composables/useQueryStringPagination";
import { parseFiltersFromQuery, serializeFiltersToQuery, DEFAULT_MODELS_FILTERS } from "~/utils/filters";

export const useModelsCatalogFiltersStore = defineStore("models-catalog-filters", () => {
  const router = useRouter();
  const route = useRoute();

  const {
    data, isLoading, error, selectedFilters, removeFilter,
  } = useModelsCatalogFilters({
    ...DEFAULT_MODELS_FILTERS,
    ...parseFiltersFromQuery(route.query),
  });

  const appliedFilters = ref<VehiclesFiltersSchema>({ ...selectedFilters.value });

  const appliedFiltersCount = computed(() => Object.values(appliedFilters.value)
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
