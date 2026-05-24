<script setup lang="ts">
import type { FilterDefinition } from "~/utils/filters";
import { useFilters } from "~/composables/useFilters";
import FiltersList from "./FiltersList.vue";
import ResponsiveFilter from "./ResponsiveFilter.vue";

defineOptions({ name: "ResponsiveFilters" });
defineProps<{ filters: FilterDefinition[]; }>();

const { responsiveFilterView } = useFilters();
</script>

<template>
  <ResponsiveFilter
    v-if="responsiveFilterView"
    :filter="filters.find(f => f.key === responsiveFilterView)!"
  />
  <FiltersList v-else :filters />
</template>
