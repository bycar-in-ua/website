<script setup lang="ts">
import { useFiltersStore } from "~/stores/filters";
import type { AppliedFilterProps } from "./types";
import BaseFilterTag from "./BaseFilterTag.vue";

defineProps<AppliedFilterProps>();

const filtersStore = useFiltersStore();
</script>

<template>
  <BaseFilterTag @remove="filtersStore.removeFilter(filter)">
    {{ filter === 'minPrice' ? 'Від' : 'До' }}
    {{ formatCurrency(Number(value), { currency: 'USD', style: 'currency', currencyDisplay: 'narrowSymbol', minimumSignificantDigits: 2 }) }}
  </BaseFilterTag>
</template>
