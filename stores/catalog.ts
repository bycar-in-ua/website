import { defineStore } from "pinia";
import { Car } from "../types/car.type";

type CatalogStoreType = {
  items: Car[];
};

export const useCatalogStore = defineStore<"catalog", CatalogStoreType>(
  "catalog",
  {
    state: () => ({
      items: [],
    }),
  }
);
