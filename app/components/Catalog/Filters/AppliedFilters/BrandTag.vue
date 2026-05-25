<script setup lang="ts">
import { useFilters } from "~/composables/useFilters";
import type { AppliedFilterProps } from "./types";
import BaseFilterTag from "./BaseFilterTag.vue";

defineProps<AppliedFilterProps>();

const { data, removeSelectedFilter } = useFilters();
</script>

<template>
  <BaseFilterTag @remove="removeSelectedFilter('brand', value)">
    {{ data?.filters.brand.find((brand) => brand.id === Number(value))?.displayName || 'Невідомий бренд' }}
  </BaseFilterTag>
</template>
