import type { Component } from "vue";
import type { Vehicle, AvailableVehicle } from "@bycar-in-ua/sdk";

export type InfoBulletProps = {
  title: string;
  value: string;
  icon: string | Component;
};

export type InfoLine = {
  title: string;
  value: string | number;
};

/**
 * @deprecated Use VehicleSearchDocument from @bycar-in-ua/vehicles-sdk instead
 */
export type AvailableCar = Vehicle
  & AvailableVehicle & {
    title: string;
    discountPrice?: number;
    discountDescription?: string;
  };
