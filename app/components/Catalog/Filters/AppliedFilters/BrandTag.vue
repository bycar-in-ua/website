<script setup lang="ts">
import { useModelsCatalogFiltersStore } from "~/stores/models-catalog-filters.store";
import type { AppliedFilterProps } from "./types";
import BaseFilterTag from "./BaseFilterTag.vue";

defineProps<AppliedFilterProps>();

const filtersStore = useModelsCatalogFiltersStore();
</script>

<template>
  <BaseFilterTag @remove="filtersStore.removeFilter('brand', value)">
    {{ filtersStore.data?.filters.brand.find((brand) => brand.id === Number(value))?.displayName }}
  </BaseFilterTag>
</template>
