import { defineStore } from "pinia";
import type { VehiclesFiltersSchema } from "@bycar-in-ua/vehicles-sdk";
import { parseFiltersFromQuery, serializeFiltersToQuery, DEFAULT_FILTERS } from "~/utils/filters";
import { useCatalogStore } from "./catalog";

export const useFiltersStore = defineStore("filters", () => {
  const router = useRouter();
  const route = useRoute();

  const {
    data, isLoading, error, selectedFilters,
  } = useCatalogFilters({
    ...DEFAULT_FILTERS,
    ...parseFiltersFromQuery(route.query),
  });

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

  const appliedFiltersCount = computed(() => Object.values(selectedFilters.value)
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

  const catalogStore = useCatalogStore();

  const syncFiltersToUrl = () => {
    const filterQuery = serializeFiltersToQuery(selectedFilters.value);

    router.replace({ query: { ...filterQuery } });
  };

  const applyFilters = () => {
    catalogStore.filters = { ...selectedFilters.value };

    syncFiltersToUrl();
  };

  const resetFilters = () => {
    selectedFilters.value = { ...catalogStore.filters };
  };

  const clearFilters = () => {
    selectedFilters.value = { ...DEFAULT_FILTERS };
    applyFilters();
  };

  return {
    selectedFilters,
    data,
    appliedFiltersCount,

    isLoading,
    error,

    applyFilters,
    removeFilter,
    clearFilters,
    resetFilters,
  };
});
