<script setup lang="ts">
import { useFiltersStore } from "~/stores/filters";
import type { AppliedFilterProps } from "./types";
import BaseFilterTag from "./BaseFilterTag.vue";

defineProps<AppliedFilterProps>();

const filtersStore = useFiltersStore();
</script>

<template>
  <BaseFilterTag @remove="filtersStore.removeFilter('brand', value)">
    {{ filtersStore.data?.filters.brand.find((brand) => brand.id === Number(value))?.displayName }}
  </BaseFilterTag>
</template>
