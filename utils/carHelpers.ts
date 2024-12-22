import type { Vehicle } from "@bycar-in-ua/sdk";
import { getPriceRange } from "~/components/UI/CarCard/helpers";

export function getCarTitle(vehicle: Vehicle) {
  const titleParts = [];

  if (vehicle.brand?.displayName) {
    titleParts.push(vehicle.brand.displayName);
  }

  titleParts.push(vehicle.model);

  return titleParts.join(" ").trim();
}

export function getComplectationsSummary(
  complectations: Vehicle["complectations"] = [],
) {
  return complectations
    ?.map((complectation) => {
      const priceRange = getPriceRange([complectation]);

      return complectation.displayName + (priceRange ? ` (${priceRange})` : "");
    })
    .join(", ");
}
