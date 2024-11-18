import { defineStore } from "pinia";
import debounce from "lodash/debounce";
import type { VehiclesSearchSchema, VehiclesOrder } from "@bycar-in-ua/sdk";

export type FiltersState = Omit<
  NonNullable<VehiclesSearchSchema["filters"]>,
  "status" | "price"
> & {
  priceFrom?: number;
  priceTo?: number;
};

export const useCatalogStore = defineStore("catalog", () => {
  // #region filters
  const filters = ref<FiltersState>({});

  const pagination = reactive<NonNullable<VehiclesSearchSchema["pagination"]>>({
    page: 1,
    limit: 15,
  });

  const order = ref<VehiclesOrder>("yearFrom-desc");

  const { $bycarApi } = useNuxtApp();

  const { status, data, refresh } = useAsyncData(
    "search-cars",
    () =>
      $bycarApi.searchVehicles({
        filters: filtersStateToSchema(filters.value),
        pagination,
        order: [order.value].filter(Boolean) as VehiclesOrder[],
      }),
    {
      default: () => ({
        items: [],
        meta: { currentPage: 1, totalPages: 0, itemsPerPage: 0, totalItems: 0 },
      }),
    },
  );

  const debouncedRefresh = debounce(refresh, 500);

  watch([filters, pagination, order], () => debouncedRefresh());

  const pending = computed(() => status.value === "pending");

  const updateFilters = async (
    field: string,
    value?: Array<string | number> | number,
  ) => {
    filters.value = { ...filters.value, [field]: value };
    pagination.page = 1;
  };

  const clearFilters = () => {
    filters.value = {};
    pagination.page = 1;
  };

  // #endregion

  // #region dictionary

  const { data: dictionary } = useAsyncData(
    "filters",
    async () => {
      const [brands, bodyTypes] = await Promise.all([
        $bycarApi.getBrands(),
        $bycarApi.getBodyTypes(),
      ]);

      return {
        brands: brands.map(({ id, displayName }) => ({ id, displayName })),
        bodyTypes,
      };
    },
    {
      default: () => ({ brands: [], bodyTypes: [] }),
    },
  );

  // #endregion

  return {
    filters,
    pagination,
    order,
    pending,
    data,
    refresh,
    updateFilters,
    clearFilters,
    dictionary,
  };
});

function filtersStateToSchema(
  filters: FiltersState,
): VehiclesSearchSchema["filters"] {
  const { priceFrom, priceTo, ...rest } = filters;
  return {
    ...rest,
    price:
      priceFrom || priceTo
        ? {
            from: priceFrom,
            to: priceTo,
          }
        : undefined,
  };
}
