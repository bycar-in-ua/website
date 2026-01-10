import { defineStore } from "pinia";
import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import type { VehiclesFiltersSchema } from "@bycar-in-ua/vehicles-sdk";

export const useFiltersStore = defineStore("filters", () => {
  const vehiclesService = useVehiclesService();

  const selectedFilters = ref<VehiclesFiltersSchema>({
    bodyType: [],
    engineType: [],
    brand: [],
    minPrice: undefined,
    maxPrice: undefined,
    availability: undefined,
    driveType: [],
    gearboxType: [],
    yearFrom: undefined,
    yearTo: undefined,
    minDisplacement: undefined,
    maxDisplacement: undefined,
    minPower: undefined,
    maxPower: undefined,
    productionRelevance: undefined,
  });

  const {
    data, isLoading, isFetching, error,
  } = useQuery({
    queryKey: ["filters", selectedFilters],
    queryFn: () => vehiclesService.getFilters(selectedFilters.value),
    placeholderData: keepPreviousData,
  });

  function clearFilters() {
    selectedFilters.value = {
      bodyType: [],
      engineType: [],
      brand: [],
      minPrice: undefined,
      maxPrice: undefined,
      availability: undefined,
      driveType: [],
      gearboxType: [],
      yearFrom: undefined,
      yearTo: undefined,
      minDisplacement: undefined,
      maxDisplacement: undefined,
      minPower: undefined,
      maxPower: undefined,
      productionRelevance: undefined,
    };
  }

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

  return {
    selectedFilters,
    data,

    isLoading,
    isFetching,
    error,

    clearFilters,
    removeFilter,
  };
});
