import { defineStore } from "pinia";
import type { VehicleView as Car, BrandDto as Brand } from "@bycar-in-ua/common";

type HomeStoreType = {
  latestItems: Car[];
  establishedBrands: Brand[];
};

export const useHomeStore = defineStore<"home", HomeStoreType>("home", {
  state: () => ({
    latestItems: [],
    establishedBrands: [],
  }),
});
