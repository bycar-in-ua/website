<script setup lang="ts">
import CarCard from "@/components/UI/CarCard/CarCard.vue";
import Pagination from "@/components/UI/Pagination.vue";
import { useCatalogStore } from "~/stores/catalog";

const catalogStore = useCatalogStore();

const list = useTemplateRef<HTMLDivElement>("list");
</script>

<template>
  <div class="w-full relative">
    <UProgress
      v-if="catalogStore.pending"
      animation="carousel"
      class="absolute -top-4 left-0 right-0"
    />

    <p
      v-if="!catalogStore.data.items.length"
      class="text-center p-4 text-xl"
      v-text="$t('emptyCatalog')"
    />
    <div
      ref="list"
      class="grid xs:grid-cols-2 sm:grid-cols-3 gap-5"
      :class="{ 'blur-sm': catalogStore.pending }"
    >
      <NuxtLink
        v-for="car in catalogStore.data.items"
        :key="car.id"
        :to="{
          name: 'SingleCar',
          params: {
            brand: car.brand?.slug ?? '',
            model: car.slug,
          },
        }"
      >
        <CarCard :car="car" />
      </NuxtLink>
    </div>
    <Pagination
      class="mt-10 flex justify-center"
      :page="catalogStore.pagination.page"
      :pagination="catalogStore.data.meta"
      @update:page="
        (page) => {
          catalogStore.pagination = { page };
          list?.scrollIntoView();
        }
      "
    />
  </div>
</template>
