import { defineStore } from "pinia";
import type { Car } from "@/types/car.type";
import type { Brand } from "@/types/brand.type";

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
