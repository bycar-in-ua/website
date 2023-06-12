import { defineStore } from "pinia";
import { VehicleDto as Car, PaginationMeta } from "@bycar-in-ua/common";

type State = {
  items: Car[];
  meta: PaginationMeta;
  pending: boolean;
};

export const useCatalogStore = defineStore("catalog", {
  state: (): State => ({
    items: [],
    meta: {
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      itemsPerPage: 0,
    },
    pending: false,
  }),
  actions: {
    async fetchCars() {
      const { $api } = useNuxtApp();
      const route = useRoute();

      try {
        this.pending = true;
        const { data } = await $api.get<{
          items: Car[];
          meta: PaginationMeta;
        }>(
          "/vehicles?" +
            new URLSearchParams({ ...route.query, limit: "12" }).toString(),
        );
        this.items = data.items;
        this.meta = data.meta;
      } finally {
        this.pending = false;
      }
    },
  },
});
