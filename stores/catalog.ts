import { defineStore } from "pinia";
import type { VehiclesFilters } from "@bycar-in-ua/sdk";

export const useCatalogStore = defineStore("catalog", () => {
  const filters = ref<Required<Omit<VehiclesFilters, "status">>>({
    price: {
      from: 0,
      to: 9999999,
    },
    brand: [],
    bodyType: [],
    engineType: [],
    drive: [],
    page: 1,
    limit: 3,
  });

  const { $bycarApi } = useNuxtApp();

  const { status, data, refresh } = useAsyncData(
    `search-cars`,
    () => $bycarApi.searchVehicles(filters.value),
    {
      default: () => ({
        items: [],
        meta: { currentPage: 1, totalPages: 0, itemsPerPage: 0, totalItems: 0 },
      }),
      watch: [filters],
    },
  );

  const pending = computed(() => status.value === "pending");

  const updateFilters = async (
    field: string,
    value: string | string[] | number | number[],
  ) => {
    filters.value = { ...filters.value, page: 1, [field]: value };
  };

  return {
    filters,
    pending,
    data,
    refresh,
    updateFilters,
  };
});
