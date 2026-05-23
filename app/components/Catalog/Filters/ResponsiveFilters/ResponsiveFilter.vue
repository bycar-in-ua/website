<script setup lang="ts">
import type { FilterDefinition } from "../types";
import CheckboxGroupFilter from "./CheckboxGroupFilter.vue";
import RadioGroupFilter from "./RadioGroupFilter.vue";
import PriceFilterView from "./PriceFilterView.vue";

defineProps<{ filter: FilterDefinition; }>();
</script>

<template>
  <div class="px-4 sm:px-6" :class="filter.type === 'range' ? 'py-4' : 'py-1'">
    <CheckboxGroupFilter v-if="filter.type === 'checkbox'" :filter="filter" />
    <RadioGroupFilter v-if="filter.type === 'radio'" :filter="filter" />
    <PriceFilterView v-if="filter.key === 'priceRange'" />
  </div>
</template>
