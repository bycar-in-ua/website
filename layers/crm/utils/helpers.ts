import type { Availability } from "@bycar-in-ua/crm-sdk";

const availabilityLabels: Record<Availability, string> = {
  dealer_stock: "В наявності у дилера",
  domestic_stock: "Склад в Україні",
  foreign_stock: "Склад закордоном",
  shipping: "В дорозі",
  factory_order: "Під замовлення",
};

export function getAvailabilityLabel(availability: Availability) {
  return availabilityLabels[availability] || "Доступність уточнюється";
}
