<script setup lang="ts">
import { PRICE_STEP } from "#shared/priceTemplates";
import { useFiltersStore } from "~/stores/filters";

const filtersStore = useFiltersStore();

const priceRange = computed(() => ({
  min: filtersStore.data?.filters.priceRange.min ?? 0,
  max: filtersStore.data?.filters.priceRange.max ?? 200000,
}));

const priceSliderModel = computed({
  get: () => [Number(filtersStore.selectedFilters.minPrice ?? 0), Number(filtersStore.selectedFilters.maxPrice ?? Infinity)],
  set: ([from, to]: number[]) => {
    filtersStore.selectedFilters.minPrice = from;
    if (Number.isFinite(to)) {
      filtersStore.selectedFilters.maxPrice = to;
    }
  },
});

const currencyFormatterConfig = {
  style: "currency",
  currency: "USD",
  currencyDisplay: "symbol",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
} as const;
</script>

<template>
  <div class="flex gap-2 items-center mb-4">
    <div class="grow">
      <slot name="min-price-label" />
      <UInputNumber
        v-model="filtersStore.selectedFilters.minPrice"
        :step="PRICE_STEP"
        :min="priceRange.min"
        :max="priceRange.max - PRICE_STEP"
        :placeholder="filtersStore.data?.filters.priceRange.min?.toString()"
        size="sm"
        class="w-full"
        :format-options="currencyFormatterConfig"
      />
    </div>
    <div class="grow">
      <slot name="max-price-label" />
      <UInputNumber
        v-model="filtersStore.selectedFilters.maxPrice"
        :step="PRICE_STEP"
        :min="priceRange.min + PRICE_STEP"
        :max="priceRange.max"
        :placeholder="filtersStore.data?.filters.priceRange.max?.toString()"
        size="sm"
        class="w-full"
        :format-options="currencyFormatterConfig"
      />
    </div>
  </div>

  <USlider
    v-model="priceSliderModel"
    :min="priceRange.min"
    :max="priceRange.max"
    :step="PRICE_STEP"
    :ui="{
      root: 'w-[99%] mx-auto',
    }"
  />
</template>
