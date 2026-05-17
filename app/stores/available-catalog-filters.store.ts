import type { AvailableVehiclesFiltersSchema, PaginationSchema } from "@bycar-in-ua/vehicles-sdk";
import { DEFAULT_AVAILABLE_FILTERS, countFilters } from "~/utils/filters";

export const useAvailableCatalogFiltersStore = defineStore("available-catalog-filters", () => {
  const selectedFilters = ref<AvailableVehiclesFiltersSchema>({ ...DEFAULT_AVAILABLE_FILTERS });
  const selectedFiltersCount = computed(() => countFilters(selectedFilters.value));

  const removeSelectedFilter = (key: keyof AvailableVehiclesFiltersSchema, value?: string | number) => {
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

  const resetSelectedFilters = () => {
    selectedFilters.value = { ...appliedFilters.value };
  };

  const appliedFilters = ref<AvailableVehiclesFiltersSchema>({ ...selectedFilters.value });
  const appliedFiltersCount = computed(() => countFilters(appliedFilters.value));

  const router = useRouter();

  const pagination = computed<PaginationSchema>({
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

  return {
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
});
