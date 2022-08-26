import { VehicleDto as Car } from "@/common";

export function getCarTitle(car: Car) {
  const titleParts = [];

  car.brand.displayName && titleParts.push(car.brand.displayName);

  titleParts.push(car.model);

  return titleParts.join(" ").trim();
}
