import { defineStore } from "pinia";
import { VehicleDto as Car } from "@/common";

type CatalogStoreType = {
  items: Car[];
};

export const useCatalogStore = defineStore<"catalog", CatalogStoreType>(
  "catalog",
  {
    state: () => ({
      items: [],
    }),
  },
);
