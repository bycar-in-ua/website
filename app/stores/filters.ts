import { defineStore } from "pinia";
import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import type { VehiclesFiltersSchema } from "@bycar-in-ua/vehicles-sdk";
import type { LocationQuery } from "vue-router";
import { useCatalogStore } from "./catalog";

const ARRAY_FILTER_KEYS: (keyof VehiclesFiltersSchema)[] = [
  "bodyType",
  "engineType",
  "brand",
  "driveType",
  "gearboxType",
];

const NUMBER_FILTER_KEYS: (keyof VehiclesFiltersSchema)[] = [
  "minPrice",
  "maxPrice",
  "yearFrom",
  "yearTo",
  "minDisplacement",
  "maxDisplacement",
  "minPower",
  "maxPower",
];

const STRING_FILTER_KEYS: (keyof VehiclesFiltersSchema)[] = [
  "availability",
  "productionRelevance",
];

const DEFAULT_FILTERS: VehiclesFiltersSchema = {
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

function serializeFiltersToQuery(filters: VehiclesFiltersSchema): Record<string, string> {
  const query: Record<string, string> = {};

  for (const key of ARRAY_FILTER_KEYS) {
    const value = filters[key];
    if (Array.isArray(value) && value.length > 0) {
      query[key] = value.join(",");
    }
  }

  for (const key of [...NUMBER_FILTER_KEYS, ...STRING_FILTER_KEYS]) {
    const value = filters[key];
    if (value !== undefined && value !== null) {
      query[key] = String(value);
    }
  }

  return query;
}

function parseFiltersFromQuery(query: LocationQuery): VehiclesFiltersSchema {
  const filters: VehiclesFiltersSchema = { ...DEFAULT_FILTERS };

  for (const key of ARRAY_FILTER_KEYS) {
    const value = query[key];
    if (typeof value === "string" && value) {
      const items = value.split(",").filter(Boolean);

      (filters[key] as string[]) = items;
    }
  }

  for (const key of NUMBER_FILTER_KEYS) {
    const value = query[key];
    if (typeof value === "string" && value) {
      const num = Number(value);
      if (!Number.isNaN(num)) {
        (filters[key] as number) = num;
      }
    }
  }

  for (const key of STRING_FILTER_KEYS) {
    const value = query[key];
    if (typeof value === "string" && value) {
      (filters[key] as string) = value;
    }
  }

  return filters;
}

export const useFiltersStore = defineStore("filters", () => {
  const router = useRouter();
  const route = useRoute();
  const vehiclesService = useVehiclesService();

  const selectedFilters = ref<VehiclesFiltersSchema>({
    ...DEFAULT_FILTERS,
    ...parseFiltersFromQuery(route.query),
  });

  const {
    data, isLoading, isFetching, error,
  } = useQuery({
    queryKey: ["filters", selectedFilters],
    queryFn: () => vehiclesService.getFilters(selectedFilters.value),
    placeholderData: keepPreviousData,
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
    isFetching,
    error,

    applyFilters,
    removeFilter,
    clearFilters,
    resetFilters,
  };
});
