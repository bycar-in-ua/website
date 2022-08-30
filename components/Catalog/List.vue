<template>
  <div class="w-full relative">
    <Transition name="fade">
      <div
        v-if="catalogStore.pending"
        class="absolute inset-0 bg-white opacity-50"
      ></div>
    </Transition>
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

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
