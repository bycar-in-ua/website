<script setup lang="ts">
import type { Filters, FiltersKeys } from "../types";
import FiltersList from "./FiltersList.vue";
import PriceFilterView from "./PriceFilterView.vue";

defineOptions({ name: "ResponsiveFilters" });
defineProps<{ filters?: Filters; }>();

const responsiveFilterView = defineModel<FiltersKeys>("filter");
const responsiveFiltersViews: Partial<Record<FiltersKeys, Component>> = { priceRange: PriceFilterView };
</script>

<template>
  <component :is="responsiveFiltersViews[responsiveFilterView]" v-if="responsiveFilterView && responsiveFiltersViews[responsiveFilterView]" />
  <FiltersList v-else :filters @filter-click="(key) => responsiveFilterView = key" />
</template>
