<script setup lang="ts">
import { useModelsCatalogFiltersStore } from "~/stores/models-catalog-filters.store";
import type { AppliedFilterProps } from "./types";
import BaseFilterTag from "./BaseFilterTag.vue";

defineProps<AppliedFilterProps>();

const filtersStore = useModelsCatalogFiltersStore();
</script>

<template>
  <BaseFilterTag @remove="filtersStore.removeFilter(filter)">
    {{ filter === 'minPrice' ? 'Від' : 'До' }}
    {{ formatCurrency(Number(value), { currency: 'USD', style: 'currency', currencyDisplay: 'narrowSymbol', minimumSignificantDigits: 2 }) }}
  </BaseFilterTag>
</template>
