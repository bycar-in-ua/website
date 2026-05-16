<script setup lang="ts">
import { useModelsCatalogFiltersStore } from "~/stores/models-catalog-filters.store";
import type { AppliedFilterProps } from "./types";
import BaseFilterTag from "./BaseFilterTag.vue";

defineProps<AppliedFilterProps>();

const filtersStore = useModelsCatalogFiltersStore();
</script>

<template>
  <BaseFilterTag @remove="filtersStore.removeFilter('bodyType', value)">
    {{ $t(`vehicle.bodyTypes.items.${value}`) }}
  </BaseFilterTag>
</template>
