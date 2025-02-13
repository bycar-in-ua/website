import type { Component } from "vue";
import type { Image, Vehicle } from "@bycar-in-ua/sdk";

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

type Dealer = {
  id: number;
  name: string;
  availability: string;
  location: string;
};

/**
 * @description Temporary solution, will be reworked to SDK
 */
export type Availability = {
  dealers: Dealer[];
  images: Image[];
};

export type AvailableCar = Vehicle & {
  title: string;
  availability: Availability;
};
