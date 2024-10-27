import { defineStore } from "pinia";
import type { VehiclesFilters } from "@bycar-in-ua/sdk";

export const useCatalogStore = defineStore("catalog", () => {
  // const router = useRouter();

  const filters = ref<Required<Omit<VehiclesFilters, "status">>>({
    price: {
      from: 0,
      to: 999999,
    },
    brand: [],
    bodyType: [],
    page: 1,
    limit: 15,
  });

  const { $bycarApi } = useNuxtApp();

  const { status, data, refresh } = useAsyncData(
    `search-cars`,
    () => $bycarApi.searchVehicles(filters.value),
    {
      default: () => ({ items: [], meta: { total: 0 } }),
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
