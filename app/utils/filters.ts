import type { VehiclesFiltersSchema } from "@bycar-in-ua/vehicles-sdk";
import type { LocationQuery } from "vue-router";

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

export const DEFAULT_FILTERS: VehiclesFiltersSchema = {
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

export function serializeFiltersToQuery(filters: VehiclesFiltersSchema): Record<string, string> {
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

export function parseFiltersFromQuery(query: LocationQuery): VehiclesFiltersSchema {
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
