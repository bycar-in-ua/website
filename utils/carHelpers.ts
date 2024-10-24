import type { Vehicle } from "@bycar-in-ua/sdk";

export function getCarTitle(vehicle: Vehicle) {
  const titleParts = [];

  if (vehicle.brand?.displayName) {
    titleParts.push(vehicle.brand.displayName);
  }

  titleParts.push(vehicle.model);

  return titleParts.join(" ").trim();
}
