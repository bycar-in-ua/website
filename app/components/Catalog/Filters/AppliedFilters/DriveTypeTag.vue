<script setup lang="ts">
import { useFiltersStore } from "~/stores/filters";
import type { AppliedFilterProps } from "./types";
import BaseFilterTag from "./BaseFilterTag.vue";

defineProps<AppliedFilterProps>();

const filtersStore = useFiltersStore();
</script>

<template>
  <BaseFilterTag @remove="filtersStore.removeFilter('driveType', value)">
    {{ $t(`filters.drive.${value}`) }}
  </BaseFilterTag>
</template>
