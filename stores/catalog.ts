import { defineStore } from "pinia";
import { VehicleDto as Car, PaginationMeta } from "@/common";

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
      totalPages: null,
      totalItems: null,
      itemsPerPage: null,
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
        this.items = data.value.items;
        this.meta = data.value.meta;
      } finally {
        this.pending = false;
      }
    },
  },
});
