import type { Composer } from "#i18n";
import { camelToSnake } from "~/utils/strings";
import type { FiltersKeys, Filters, FilterDefinition } from "./types";

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

/**
 * Rework on backend, return "all" and "current", remove "discontinued"
 */
// const buildProductionRelevanceFilter: FilterDefinitionBuilder<"productionRelevance"> = (data, t) => ({
//   key: "productionRelevance",
//   label: t("filters.productionRelevance.title"),
//   type: "radio",
//   options: Object.entries(data).map(([relevance, count]) => ({
//     value: relevance,
//     label: t(`filters.productionRelevance.${relevance}`),
//     count,
//     disabled: count === 0,
//   }))
// });

// Rework backend filters to use string here
const buildDiscountFilter: FilterDefinitionBuilder<"discount"> = (data, t) => ({
  key: "discount",
  label: t("filters.discount.title"),
  type: "radio",
  options: Object.entries(data).map(([discount, count]) => ({
    value: (discount === "discounted" ? true : false) as unknown as string,
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
  // if (filters.productionRelevance) {
  //   definitions.push(buildProductionRelevanceFilter(filters.productionRelevance, t));
  // }
  if (filters.discount) {
    definitions.push(buildDiscountFilter(filters.discount, t));
  }

  // Range filters
  if (filters.priceRange) {
    definitions.push(buildPriceRangeFilter(filters.priceRange, t));
  }

  return definitions.sort((a, b) => filtersWeights[a.key] - filtersWeights[b.key]);
}
