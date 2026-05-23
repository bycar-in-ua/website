<script setup lang="ts">
import type { FilterListItem } from "../types";
import FilterLabel from "../FilterLabel.vue";

defineProps<{ items: FilterListItem[]; }>();

const model = defineModel<string[]>();
</script>

<template>
  <UCheckboxGroup v-model="model" :items :ui="{ root: 'max-h-40 overflow-y-auto px-0' }">
    <template #label="{ item }">
      <FilterLabel :label="item.label" :count="item.count" />
    </template>
  </UCheckboxGroup>
</template>
