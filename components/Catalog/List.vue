<script setup lang="ts">
import CarCard from "@/components/UI/CarCard/index.vue";
import Pagination from "@/components/UI/Pagination/index.vue";
import { useCatalogStore } from "~/stores/catalog";

const catalogStore = useCatalogStore();

const list = ref();
</script>

<template>
  <div class="w-full relative">
    <p
      v-if="!catalogStore.data.items.length"
      class="text-center p-4 text-xl"
      v-text="$t('emptyCatalog')"
    />
    <div ref="list" class="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
      <CarCard
        v-for="car in catalogStore.data.items"
        :key="car.id"
        :car="car"
      />
    </div>
    <Pagination
      v-model:page="catalogStore.pagination.page"
      class="mt-10 justify-center"
      :pagination="catalogStore.data.meta"
      @update:page="() => list?.scrollIntoView()"
    />
  </div>
</template>
