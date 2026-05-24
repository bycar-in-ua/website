<script setup lang="ts">
import { useFilters } from "~/composables/useFilters";
import type { AppliedFilterProps } from "./types";
import BaseFilterTag from "./BaseFilterTag.vue";

defineProps<AppliedFilterProps>();

const { removeSelectedFilter } = useFilters();
</script>

<template>
  <BaseFilterTag @remove="removeSelectedFilter('engineType', value)">
    {{ $t(`filters.engineType.${value}`) }}
  </BaseFilterTag>
</template>
