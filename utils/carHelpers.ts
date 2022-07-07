import { VehicleDto } from "../common";

export function getCarTitle(car: VehicleDto) {
  const titleParts = [];

  car.brand.displayName && titleParts.push(car.brand.displayName);

  titleParts.push(car.model);

  return titleParts.join(" ").trim();
}
