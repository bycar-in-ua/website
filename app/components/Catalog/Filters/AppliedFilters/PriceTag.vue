<script setup lang="ts">
import { useFilters } from "~/composables/useFilters";
import type { AppliedFilterProps } from "./types";
import BaseFilterTag from "./BaseFilterTag.vue";

defineProps<AppliedFilterProps>();

const { removeSelectedFilter } = useFilters();
</script>

<template>
  <BaseFilterTag @remove="removeSelectedFilter(filter)">
    {{ filter === 'minPrice' ? 'Від' : 'До' }}
    {{ formatCurrency(Number(value), { currency: 'USD', style: 'currency', currencyDisplay: 'narrowSymbol', minimumSignificantDigits: 2 }) }}
  </BaseFilterTag>
</template>
