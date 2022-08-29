<template>
  <div class="w-full">
    <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <CarCard v-for="car in catalogStore.items" :key="car.id" :car="car" />
    </div>
    <Pagination
      class="mt-5 justify-center"
      :pagination="catalogStore.meta"
      @update:page="paginationHandler"
    />
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

const router = useRouter();
const catalogStore = useCatalogStore();

const paginationHandler = async (page) => {
  await router.replace({
    query: { ...router.currentRoute.value.query, page: page },
  });
  await catalogStore.fetchCars();
};
</script>
