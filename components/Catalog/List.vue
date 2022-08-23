<template>
  <div class="py-8 flex-grow">
    <div
      class="py-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      <CarCard v-for="car in catalogStore.items" :key="car.id" :car="car" />
    </div>
    <Pagination class="mt-5 justify-center" />
  </div>
</template>

<script lang="ts">
export default {
  name: "CatalogList",
};
</script>

<script setup lang="ts">
import CarCard from "@/components/common/CarCard/index.vue";
import Pagination from "../common/Pagination/index.vue";
import { useCatalogStore } from "../../stores/catalog";

const catalogStore = useCatalogStore();
</script>
