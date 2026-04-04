import { defineStore } from "pinia";
import type { VehiclesSearchSchema } from "@bycar-in-ua/sdk";
import type { FiltersState } from "#shared/types";
import type { SearchVehiclesInput, VehiclesFiltersSchema } from "@bycar-in-ua/vehicles-sdk";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { useFiltersStore } from "~/stores/filters";

export const useCatalogStore = defineStore("catalog", () => {
  const filtersStore = useFiltersStore();

  const router = useRouter();

  const filters = ref<VehiclesFiltersSchema>({ ...filtersStore.selectedFilters });

  const pagination = computed<NonNullable<VehiclesSearchSchema["pagination"]>>({
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

  const order = ref<SearchVehiclesInput["sort"]>({ field: "recommended" });

  const vehiclesService = useVehiclesService();

  const {
    data, refetch, isLoading,
  } = useQuery({
    queryKey: [
      "search-cars", filters, pagination, order,
    ],
    queryFn: () =>
      vehiclesService.searchVehicles({
        filters: filters.value,
        pagination: pagination.value,
        sort: order.value,
      }),
    placeholderData: keepPreviousData,
  });

  const updateFilters = async (
    field: string,
    value?: Array<string | number> | number,
  ) => {
    filters.value = {
      ...filters.value,
      [field]: value,
    };
    pagination.value.page = 1;
  };

  const clearFilters = () => {
    filters.value = {} as FiltersState;
    pagination.value.page = 1;
  };

  return {
    filters,
    pagination,
    order,
    isLoading,
    data,
    refetch,
    updateFilters,
    clearFilters,
  };
});
