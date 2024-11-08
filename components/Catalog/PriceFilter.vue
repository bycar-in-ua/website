<script setup lang="ts">
import Slider from "@/components/UI/Slider.vue";
import { useCatalogStore } from "@/stores/catalog.js";

const catalogStore = useCatalogStore();

const priceSliderModel = computed({
  get: () => [catalogStore.filters.priceFrom ?? 0, catalogStore.filters.priceTo ?? Infinity],
  set: ([from, to]: number[]) => {
    catalogStore.updateFilters("priceFrom", from);
    catalogStore.updateFilters("priceTo", Number.isFinite(to) ? to : undefined);
  },
});
</script>

<template>
  <div class="flex gap-2 items-center mb-4">
    <UInput
      v-model="catalogStore.filters.priceFrom"
      size="xs"
      type="number"
      step="1000"
    />
    <span>-</span>
    <UInput
      v-model="catalogStore.filters.priceTo"
      size="xs"
      type="number"
      step="1000"
    />
    <span>$</span>
  </div>

  <Slider
    v-model="priceSliderModel"
    :min="0"
    :max="200000"
    :step="1000"
  />
</template>
