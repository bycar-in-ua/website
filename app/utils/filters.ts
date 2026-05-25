import type {
  VehiclesFiltersSchema,
  AvailableVehiclesFiltersSchema,
  VehiclesFiltersResponse,
  AvailableVehiclesFiltersResponse,
} from "@bycar-in-ua/vehicles-sdk";
import type { LocationQuery } from "vue-router";
import type { Composer } from "#i18n";

export type UnifiedFiltersSchema = VehiclesFiltersSchema & AvailableVehiclesFiltersSchema;

export type Filters = VehiclesFiltersResponse["filters"] & AvailableVehiclesFiltersResponse["filters"];

export type FiltersKeys = keyof VehiclesFiltersResponse["filters"] | keyof AvailableVehiclesFiltersResponse["filters"];

export type FilterListItem = {
  label: string;
  count: number;
  value: string;
  disabled?: boolean;
};

export interface BaseFilterDefinition {
  key: FiltersKeys;
  label: string;
};

export interface ListFilterDefinition extends BaseFilterDefinition {
  options: FilterListItem[];
  type: "checkbox" | "radio";
}

export interface RangeFilterDefinition extends BaseFilterDefinition {
  type: "range";
}

export type FilterDefinition = ListFilterDefinition | RangeFilterDefinition;

const sharedDefaultFilters: Omit<VehiclesFiltersSchema, "availability" | "productionRelevance"> = Object.freeze({
  bodyType: [],
  engineType: [],
  brand: [],
  minPrice: undefined,
  maxPrice: undefined,
  driveType: [],
  gearboxType: [],
  yearFrom: undefined,
  yearTo: undefined,
  minDisplacement: undefined,
  maxDisplacement: undefined,
  minPower: undefined,
  maxPower: undefined,
});

export const DEFAULT_MODELS_FILTERS: VehiclesFiltersSchema = Object.freeze({
  ...sharedDefaultFilters,
  availability: "all",
  productionRelevance: "all",
});

export const DEFAULT_AVAILABLE_FILTERS: AvailableVehiclesFiltersSchema = Object.freeze({
  ...sharedDefaultFilters,
  location: undefined,
  discount: "all",
  model: undefined,
});

const isFilterDefaultValue = (curr: unknown, defaultValue: unknown) => {
  if (Array.isArray(curr) && Array.isArray(defaultValue)) {
    return curr.length === defaultValue.length
      && curr.every((value, index) => value === defaultValue[index]);
  }

  return Object.is(curr, defaultValue);
};

export function serializeFiltersToQuery(filters: UnifiedFiltersSchema, defaultFilters: UnifiedFiltersSchema): Record<string, string> {
  const query: Record<string, string> = {};

  for (const key of Object.keys(filters)) {
    const defaultValue = defaultFilters[key as keyof typeof defaultFilters];
    const value = filters[key as keyof typeof filters];

    if (isFilterDefaultValue(value, defaultValue) || value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      if (value.length > 0) {
        query[key] = value.join(",");
      }

      continue;
    }

    query[key] = String(value);
  }

  return query;
}

const ARRAY_FILTER_KEYS: (keyof UnifiedFiltersSchema)[] = [
  "bodyType",
  "engineType",
  "brand",
  "driveType",
  "gearboxType",
];

const NUMBER_FILTER_KEYS: (keyof UnifiedFiltersSchema)[] = [
  "minPrice",
  "maxPrice",
  "yearFrom",
  "yearTo",
  "minDisplacement",
  "maxDisplacement",
  "minPower",
  "maxPower",
];

const STRING_FILTER_KEYS: (keyof UnifiedFiltersSchema)[] = [
  "availability",
  "productionRelevance",
  "discount",
];

export function parseFiltersFromQuery(query: LocationQuery, defaultFilters: UnifiedFiltersSchema): UnifiedFiltersSchema {
  const filters: UnifiedFiltersSchema = { ...defaultFilters };

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

export const countFilters = (filters: VehiclesFiltersSchema | AvailableVehiclesFiltersSchema) => {
  const defaultFilters = "availability" in filters
    ? DEFAULT_MODELS_FILTERS
    : DEFAULT_AVAILABLE_FILTERS;

  return Object.entries(filters)
    .reduce<{ count: number; }>((acc, [key, curr]) => {
      const defaultValue = defaultFilters[key as keyof typeof defaultFilters];

      if (isFilterDefaultValue(curr, defaultValue)) {
        return acc;
      }

      if (Array.isArray(curr)) {
        acc.count += curr.length;
      } else {
        acc.count += 1;
      }

      return acc;
    }, { count: 0 })
    .count;
};
type FilterDefinitionBuilder<TKey extends FiltersKeys> = (data: Filters[TKey], t: Composer["t"]) => FilterDefinition;

const buildBodyTypeFilter: FilterDefinitionBuilder<"bodyType"> = (data, t) => ({
  key: "bodyType",
  label: t("filters.bodyType.title"),
  type: "checkbox",
  options: data.map((bt) => ({
    value: bt.value,
    label: t(`vehicle.bodyTypes.items.${bt.value}`),
    count: bt.count,
    disabled: bt.count === 0,
  })),
});

const buildEngineTypeFilter: FilterDefinitionBuilder<"engineType"> = (data, t) => ({
  key: "engineType",
  label: t("filters.engineType.title"),
  type: "checkbox",
  options: data.map((engineType) => ({
    value: engineType.value,
    label: t(`filters.engineType.${engineType.value}`),
    count: engineType.count,
    disabled: engineType.count === 0,
  })),
});

const buildDriveTypeFilter: FilterDefinitionBuilder<"driveType"> = (data, t) => ({
  key: "driveType",
  label: t("filters.driveType.title"),
  type: "checkbox",
  options: data.map((driveType) => ({
    value: driveType.value,
    label: t(`filters.drive.${driveType.value}`),
    count: driveType.count,
    disabled: driveType.count === 0,
  })),
});

const buildBrandFilter: FilterDefinitionBuilder<"brand"> = (data, t) => ({
  key: "brand",
  label: t("filters.brand.title"),
  type: "checkbox",
  options: data.map((brand) => ({
    value: brand.id.toString(),
    label: brand.displayName,
    count: brand.count,
    disabled: brand.count === 0,
  })),
});

const buildAvailablilityFilter: FilterDefinitionBuilder<"availability"> = (data, t) => ({
  key: "availability",
  label: t("filters.availability.title"),
  type: "radio",
  options: Object.entries(data).map(([availability, count]) => ({
    value: camelToSnake(availability),
    label: t(`filters.availability.${availability}`),
    count,
    disabled: count === 0,
  })),
});

const buildProductionRelevanceFilter: FilterDefinitionBuilder<"productionRelevance"> = (data, t) => {
  const currentCount = data.current;
  const allCount = currentCount + data.discontinued;

  return {
    key: "productionRelevance",
    label: t("filters.productionRelevance.title"),
    type: "radio",
    options: [
      {
        value: "all",
        label: t("filters.productionRelevance.all"),
        count: allCount,
        disabled: allCount === 0,
      },
      {
        value: "current",
        label: t("filters.productionRelevance.current"),
        count: currentCount,
        disabled: currentCount === 0,
      },
    ],
  };
};

// Rework backend filters to use string here
const buildDiscountFilter: FilterDefinitionBuilder<"discount"> = (data, t) => ({
  key: "discount",
  label: t("filters.discount.title"),
  type: "radio",
  options: Object.entries(data).map(([discount, count]) => ({
    value: discount,
    label: t(`filters.discount.${discount}`),
    count,
    disabled: count === 0,
  })),
});

const buildPriceRangeFilter: FilterDefinitionBuilder<"priceRange"> = (_, t) => ({
  key: "priceRange",
  label: t("filters.priceRange.title"),
  type: "range",
});

const buildYearFilter: FilterDefinitionBuilder<"yearRange"> = (_, t) => ({
  key: "yearRange",
  label: t("filters.yearRange.title"),
  type: "range",
});

const filtersWeights: Record<FiltersKeys, number> = {
  location: 0,
  availability: 1,
  priceRange: 2,
  discount: 3,
  bodyType: 4,
  brand: 4,
  engineType: 6,
  displacementRange: 7,
  powerRange: 8,
  model: 9,
  driveType: 10,
  gearboxType: 11,
  productionRelevance: 12,
  yearRange: 13,
};

export function buildFilterDefinitions(filters: Filters, t: Composer["t"]): FilterDefinition[] {
  const definitions: FilterDefinition[] = [];

  // Checkbox filters
  if (filters.bodyType) {
    definitions.push(buildBodyTypeFilter(filters.bodyType, t));
  }
  if (filters.engineType) {
    definitions.push(buildEngineTypeFilter(filters.engineType, t));
  }
  if (filters.driveType) {
    definitions.push(buildDriveTypeFilter(filters.driveType, t));
  }
  if (filters.brand) {
    definitions.push(buildBrandFilter(filters.brand, t));
  }

  // Radio filters
  if (filters.availability) {
    definitions.push(buildAvailablilityFilter(filters.availability, t));
  }
  if (filters.productionRelevance) {
    definitions.push(buildProductionRelevanceFilter(filters.productionRelevance, t));
  }
  if (filters.discount) {
    definitions.push(buildDiscountFilter(filters.discount, t));
  }

  // Range filters
  if (filters.priceRange) {
    definitions.push(buildPriceRangeFilter(filters.priceRange, t));
  }
  if (filters.yearRange) {
    definitions.push(buildYearFilter(filters.yearRange, t));
  }

  return definitions.sort((a, b) => filtersWeights[a.key] - filtersWeights[b.key]);
}
