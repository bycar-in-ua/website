import type { Component } from "vue";
import type { Vehicle, AvailableVehicle } from "@bycar-in-ua/sdk";

export type InfoBulletProps = {
  title: string;
  value: string;
  icon: string | Component;
};

export type InfoBlock = {
  title: string;
  defaultOpen?: boolean;
  items: Array<{
    title: string;
    value: string | number;
  }>;
};

export type AvailableCar = Vehicle &
  AvailableVehicle & {
    title: string;
    discountPrice?: number;
    discountDescription?: string;
  };
