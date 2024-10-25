<script setup lang="ts">
import CarCard from "@/components/UI/CarCard/index.vue";
import Pagination from "@/components/UI/Pagination/index.vue";
import { useCatalogStore } from "~/stores/catalog";

const catalogStore = useCatalogStore();
</script>

<template>
  <div class="w-full relative">
    <p
      v-if="!catalogStore.data.items.length"
      class="text-center p-4 text-xl"
      v-text="$t('emptyCatalog')"
    />
    <Transition name="fade">
      <div
        v-if="catalogStore.pending"
        class="absolute inset-0 bg-white opacity-50"
      />
    </Transition>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      <CarCard
        v-for="car in catalogStore.data.items"
        :key="car.id"
        :car="car"
      />
    </div>
    <Pagination
      class="mt-5 justify-center"
      :pagination="catalogStore.data.meta"
      @update:page="(page: number) => catalogStore.updateFilters('page', page.toString())"
    />
  </div>
</template>

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
