<script setup lang="ts">
import { useFilters } from "~/composables/useFilters";
import type { AppliedFilterProps } from "./types";
import BaseFilterTag from "./BaseFilterTag.vue";

defineProps<AppliedFilterProps>();

const { removeSelectedFilter } = useFilters();
</script>

<template>
  <BaseFilterTag @remove="removeSelectedFilter('driveType', value)">
    {{ $t(`filters.drive.${value}`) }}
  </BaseFilterTag>
</template>
