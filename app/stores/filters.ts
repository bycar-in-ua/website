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
    availability: "all",
    driveType: [],
    gearboxType: [],
    yearFrom: undefined,
    yearTo: undefined,
    minDisplacement: undefined,
    maxDisplacement: undefined,
    minPower: undefined,
    maxPower: undefined,
    productionRelevance: "all",
  });

  const {
    data, isLoading, isFetching, error,
  } = useQuery({
    queryKey: ["filters", selectedFilters],
    queryFn: () => vehiclesService.getFilters(selectedFilters.value),
    placeholderData: keepPreviousData,
  });

  const priceRange = computed(() => ({
    min: data.value?.filters.priceRange.min ?? 0,
    max: data.value?.filters.priceRange.max ?? 200000,
  }));

  const yearRange = computed(() => ({
    min: data.value?.filters.yearRange.min ?? 2000,
    max: data.value?.filters.yearRange.max ?? new Date().getFullYear(),
  }));

  const totalCount = computed(() => data.value?.total ?? 0);

  const availabilityOptions = computed(() => ({
    all: data.value?.filters.availability.all ?? 0,
    availableNow: data.value?.filters.availability.availableNow ?? 0,
  }));

  const hasActiveFilters = computed(() => {
    return (
      (selectedFilters.value.brand?.length ?? 0) > 0
      || (selectedFilters.value.bodyType?.length ?? 0) > 0
      || (selectedFilters.value.engineType?.length ?? 0) > 0
      || (selectedFilters.value.driveType?.length ?? 0) > 0
      || (selectedFilters.value.gearboxType?.length ?? 0) > 0
      || selectedFilters.value.minPrice !== undefined
      || selectedFilters.value.maxPrice !== undefined
      || selectedFilters.value.yearFrom !== undefined
      || selectedFilters.value.yearTo !== undefined
      || selectedFilters.value.minDisplacement !== undefined
      || selectedFilters.value.maxDisplacement !== undefined
      || selectedFilters.value.minPower !== undefined
      || selectedFilters.value.maxPower !== undefined
      || selectedFilters.value.availability !== "all"
      || selectedFilters.value.productionRelevance !== "all"
    );
  });

  // Helper for availableOnly boolean mapping
  const availableOnly = computed({
    get: () => selectedFilters.value.availability === "available_now",
    set: (value: boolean) => {
      selectedFilters.value.availability = value ? "available_now" : "all";
    },
  });

  // 4. Actions
  function toggleFilter<K extends keyof VehiclesFiltersSchema>(
    field: K,
    value: any,
  ) {
    const current = selectedFilters.value[field];
    if (!Array.isArray(current)) return;

    const valueExists = current.includes(value);

    if (valueExists) {
      selectedFilters.value[field] = current.filter((v) => v !== value) as any;
    } else {
      selectedFilters.value[field] = [...current, value] as any;
    }
  }

  function setPriceRange(min?: number, max?: number) {
    selectedFilters.value.minPrice = min;
    selectedFilters.value.maxPrice = max;
  }

  function setAvailability(value: "all" | "available_now") {
    selectedFilters.value.availability = value;
  }

  function setProductionRelevance(
    value: "all" | "current" | "discontinued",
  ) {
    selectedFilters.value.productionRelevance = value;
  }

  function clearFilters() {
    selectedFilters.value = {
      bodyType: [],
      engineType: [],
      brand: [],
      minPrice: undefined,
      maxPrice: undefined,
      availability: "all",
      driveType: [],
      gearboxType: [],
      yearFrom: undefined,
      yearTo: undefined,
      minDisplacement: undefined,
      maxDisplacement: undefined,
      minPower: undefined,
      maxPower: undefined,
      productionRelevance: "all",
    };
  }

  function clearFilter<K extends keyof VehiclesFiltersSchema>(field: K) {
    if (Array.isArray(selectedFilters.value[field])) {
      selectedFilters.value[field] = [] as any;
    } else {
      selectedFilters.value[field] = undefined as any;
    }
  }

  return {
    selectedFilters,
    data,

    isLoading,
    isFetching,
    error,

    priceRange,
    yearRange,

    totalCount,
    availabilityOptions,

    hasActiveFilters,
    availableOnly,

    toggleFilter,
    setPriceRange,
    setAvailability,
    setProductionRelevance,
    clearFilters,
    clearFilter,
  };
});
