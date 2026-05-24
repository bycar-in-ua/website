<script setup lang="ts">
import type { FilterDefinition } from "~/utils/filters";
import CheckboxGroupFilter from "./CheckboxGroupFilter.vue";
import RadioGroupFilter from "./RadioGroupFilter.vue";
import PriceFilterView from "./PriceFilterView.vue";
import YearFilterView from "./YearFilterView.vue";

defineProps<{ filter: FilterDefinition; }>();
</script>

<template>
  <div class="px-4 sm:px-6" :class="filter.type === 'range' ? 'py-4' : 'py-1'">
    <CheckboxGroupFilter v-if="filter.type === 'checkbox'" :filter="filter" />
    <RadioGroupFilter v-if="filter.type === 'radio'" :filter="filter" />
    <PriceFilterView v-if="filter.key === 'priceRange'" />
    <YearFilterView v-if="filter.key === 'yearRange'" />
  </div>
</template>
