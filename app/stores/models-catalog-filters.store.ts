import { defineStore } from "pinia";
import { useModelsCatalogFilters } from "~/composables/useModelsCatalogFilters";
import type { SearchVehiclesInput, VehiclesFiltersSchema } from "@bycar-in-ua/vehicles-sdk";
import { parseFiltersFromQuery, serializeFiltersToQuery, DEFAULT_FILTERS } from "~/utils/filters";

export const useModelsCatalogFiltersStore = defineStore("filters", () => {
  const router = useRouter();
  const route = useRoute();

  const {
    data, isLoading, error, selectedFilters, removeFilter,
  } = useModelsCatalogFilters({
    ...DEFAULT_FILTERS,
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

  const pagination = computed<NonNullable<SearchVehiclesInput["pagination"]>>({
    get() {
      return {
        page: Number(router.currentRoute.value.query.page ?? 1),
        limit: 15,
      };
    },
    set(value) {
      router.replace({
        query: {
          ...router.currentRoute.value.query,
          page: String(value.page),
        },
      });
    },
  });

  const sort = ref<SearchVehiclesInput["sort"]>({ field: "recommended" });

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
    selectedFilters.value = { ...DEFAULT_FILTERS };
    applyFilters();
  };

  return {
    data,
    selectedFilters,
    appliedFilters,
    appliedFiltersCount,
    pagination,
    sort,

    isLoading,
    error,

    applyFilters,
    removeFilter,
    clearFilters,
    resetFilters,
  };
});
