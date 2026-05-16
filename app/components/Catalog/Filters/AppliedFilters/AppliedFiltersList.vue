<script setup lang="ts">
import { useModelsCatalogFiltersStore } from "~/stores/models-catalog-filters.store";
import BrandTag from "./BrandTag.vue";
import BodyTypeTag from "./BodyTypeTag.vue";
import EngineTypeTag from "./EngineTypeTag.vue";
import DriveTypeTag from "./DriveTypeTag.vue";
import PriceTag from "./PriceTag.vue";
import type { VehiclesFiltersSchema } from "@bycar-in-ua/vehicles-sdk";

const filtersStore = useModelsCatalogFiltersStore();

const appliedFilters = computed(() => {
  return Object.entries(filtersStore.selectedFilters)
    .filter(([, value]) => Boolean(value))
    .flatMap(([filter, value]) => Array.isArray(value) ? value.map((v) => [filter, v]) : [[filter, value]]);
});

const filtersMap: Partial<Record<keyof VehiclesFiltersSchema, Component>> = {
  brand: BrandTag,
  bodyType: BodyTypeTag,
  engineType: EngineTypeTag,
  driveType: DriveTypeTag,
  maxPrice: PriceTag,
  minPrice: PriceTag,
};
</script>

<template>
  <div class="py-4 px-6 flex flex-col gap-4">
    <h3 class="font-semibold uppercase">
      Застосовані фільтри
    </h3>

    <div class="flex gap-2 items-start flex-wrap">
      <component
        :is="filtersMap[filter as keyof VehiclesFiltersSchema]"
        v-for="([filter, value], i) in appliedFilters"
        :key="i"
        :value
        :filter
      />
    </div>
  </div>
</template>
