import { Brand } from "./brand.type";

export type Car = {
  id: number;
  brand: Brand;
  status: string;
  model: string;
  yearFrom: number;
  yearTo?: number;
  description?: string;
  bodyType: string;
  sizeClass?: string;
  powerSteering?: string;
  enginePlacement?: string;
  numberOfDoors?: number;
  dimensionL?: number;
  dimensionW?: number;
  dimensionH?: number;
  clearance?: number;
  wheelbase?: number;
  curbWeight?: number;
  fullWeight?: number;
  numberOfSeats?: number;
  gasTankVolume?: number;
  trunkVolume?: number;
  slug: string;
  featureImage?: Object;
  images?: CarImage[];
};

export type CarImage = {
  id: number;
  path: string;
};
