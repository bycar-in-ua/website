<script setup lang="ts">
import { useFilters } from "~/composables/useFilters";
import type { AppliedFilterProps } from "./types";
import BaseFilterTag from "./BaseFilterTag.vue";

defineProps<AppliedFilterProps>();

const { selectedFilters } = useFilters();
</script>

<template>
  <BaseFilterTag v-if="value !== 'all'" @remove="selectedFilters.availability = 'all'">
    Доступно зараз
  </BaseFilterTag>
</template>
