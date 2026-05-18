import type { FiltersKeys, Filters } from "./types";

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

export function sortFiltersByWeight(filters: Filters = {} as Filters): Filters {
  return Object.fromEntries(Object.entries(filters).sort((a, b) => filtersWeights[a[0] as FiltersKeys] - filtersWeights[b[0] as FiltersKeys])) as Filters;
}
