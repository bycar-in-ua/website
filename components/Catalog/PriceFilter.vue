<script setup lang="ts">
import debounce from "lodash/debounce";
import Slider from "@/components/UI/Slider.vue";
import { useCatalogStore } from "@/stores/catalog.js";

const catalogStore = useCatalogStore();

const priceSliderModel = ref([catalogStore.filters.priceFrom ?? 0, catalogStore.filters.priceTo ?? Infinity]);

const debouncedPricaUpdateHandler = debounce(([min, max]: number[]) => {
  if (Number.isFinite(min)) {
    catalogStore.updateFilters("priceFrom", min);
  }

  if (Number.isFinite(max)) {
    catalogStore.updateFilters("priceTo", max);
  }
}, 1000);

watch(priceSliderModel, debouncedPricaUpdateHandler);
</script>

<template>
  <div class="flex gap-2 items-center mb-4">
    <UInput
      v-model="priceSliderModel[0]"
      size="xs"
      type="number"
      step="1000"
    />
    <span>-</span>
    <UInput
      v-model="priceSliderModel[1]"
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
