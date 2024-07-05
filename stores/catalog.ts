import { defineStore } from "pinia";
import type { VehicleView as Car, PaginationMeta } from "@bycar-in-ua/common";

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
      const queryString = new URLSearchParams({
        ...route.query,
        limit: "12",
      }).toString();

      try {
        this.pending = true;

        const data = await $api.get<{
          items: Car[];
          meta: PaginationMeta;
        }>(`/vehicles?${queryString}`);

        this.items = data.items;
        this.meta = data.meta;
      } finally {
        this.pending = false;
      }
    },
  },
});
