<script setup lang="ts">
import RangeControl from "~/components/UI/RangeControl.vue";
import { useFilters } from "~/composables/useFilters";

const PRICE_STEP = 5_000;

const { data } = useFilters();

const minPrice = defineModel<number>("minPrice");
const maxPrice = defineModel<number>("maxPrice");

const currencyFormatterConfig = {
  style: "currency",
  currency: "USD",
  currencyDisplay: "symbol",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
} as const;
</script>

<template>
  <RangeControl
    v-model:min="minPrice"
    v-model:max="maxPrice"
    :boundaries="{ min: data?.filters.priceRange.min, max: data?.filters.priceRange.max }"
    min-label="Від"
    max-label="До"
    :step="PRICE_STEP"
    :format-options="currencyFormatterConfig"
  />
</template>
