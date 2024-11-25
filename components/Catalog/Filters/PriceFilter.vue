<script setup lang="ts">
import Slider from "@/components/UI/Slider.vue";
import { useCatalogStore } from "@/stores/catalog.js";
import Collapsible from "@/components/UI/Collapsible.vue";

const { t } = useI18n();

const catalogStore = useCatalogStore();

const updatePriceFrom = (value?: number | number) => {
  if (
    typeof value !== "number" ||
    (catalogStore.filters.priceTo && value > catalogStore.filters.priceTo)
  ) {
    catalogStore.updateFilters("priceFrom", 0);
    return;
  }

  catalogStore.updateFilters("priceFrom", +value > 0 ? +value : 0);
};

const updatePriceTo = (value?: number | number) => {
  if (
    typeof value !== "number" ||
    (catalogStore.filters.priceFrom && value < catalogStore.filters.priceFrom)
  ) {
    catalogStore.updateFilters("priceTo", undefined);
    return;
  }

  catalogStore.updateFilters("priceTo", +value > 0 ? +value : 0);
};

const priceSliderModel = computed({
  get: () => [
    Number(catalogStore.filters.priceFrom ?? 0),
    Number(catalogStore.filters.priceTo ?? Infinity),
  ],
  set: ([from, to]: number[]) => {
    updatePriceFrom(from);
    updatePriceTo(to);
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
catalogStore.$subscribe((_, state) => {});
</script>

<template>
  <Collapsible :title="t('price')" :default-open="true">
    <template #content>
      <div class="flex gap-2 items-center mb-4 pl-1 pt-1">
        <UInput
          :model-value="catalogStore.filters.priceFrom"
          size="xs"
          type="number"
          :step="1000"
          :min="0"
          :max="200000"
          @update:model-value="updatePriceFrom"
        />
        <span>-</span>
        <UInput
          :model-value="catalogStore.filters.priceTo"
          size="xs"
          type="number"
          :step="1000"
          :min="1000"
          :max="200000"
          @update:model-value="updatePriceTo"
        />
        <span>$</span>
      </div>

      <Slider
        v-model="priceSliderModel"
        :min="0"
        :max="200000"
        :step="1000"
        class="h-3"
      />
    </template>
  </Collapsible>
</template>
