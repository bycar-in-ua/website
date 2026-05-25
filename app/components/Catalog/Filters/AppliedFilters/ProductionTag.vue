<script setup lang="ts">
import { useFilters } from "~/composables/useFilters";
import type { AppliedFilterProps } from "./types";
import BaseFilterTag from "./BaseFilterTag.vue";

defineProps<AppliedFilterProps>();

const { selectedFilters } = useFilters();
</script>

<template>
  <BaseFilterTag v-if="value !== 'all'" @remove="selectedFilters.productionRelevance = 'all'">
    Виробляються зараз
  </BaseFilterTag>
</template>
