import type {
  Trim,
  Vehicle,
  AvailableVehicleView,
  TrimView,
  VehicleView,
} from "@bycar-in-ua/vehicles-sdk";

export function getCarTitle(vehicle: VehicleView | AvailableVehicleView): string {
  const titleParts = [];

  if (vehicle.brand?.displayName) {
    titleParts.push(vehicle.brand.displayName);
  }

  titleParts.push(vehicle.model);

  return titleParts.join(" ").trim();
}

export function getPriceRange(complectations?: Trim[] | TrimView[]): string {
  if (!complectations?.length) {
    return "";
  }

  const prices = complectations
    .flatMap((complectation) =>
      complectation.powerUnits?.map(({ price }) => price),
    )
    .filter(Boolean) as number[];

  if (!prices.length) {
    return "";
  }

  if (prices.length === 1) {
    return `$${prices[0]?.toLocaleString()}`;
  }

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
}

export function getComplectationsSummary(
  complectations: Vehicle["complectations"] | TrimView[] = [],
) {
  return complectations
    ?.map((complectation) => {
      const priceRange = getPriceRange([complectation as Trim]);

      return complectation.displayName + (priceRange ? ` (${priceRange})` : "");
    })
    .join(", ");
}
