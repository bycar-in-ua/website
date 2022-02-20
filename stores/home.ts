import { defineStore } from "pinia";
import { Car } from "@/types/car.type";

type HomeStoreType = {
  latestItems: Car[];
};

export const useHomeStore = defineStore<"home", HomeStoreType>("home", {
  state: () => ({
    latestItems: [],
    establishedBrands: [],
  }),
});
