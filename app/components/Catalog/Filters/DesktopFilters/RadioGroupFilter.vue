<script setup lang="ts">
import type { FilterListItem } from "~/utils/filters";
import FilterLabel from "../FilterLabel.vue";

defineProps<{ items: FilterListItem[]; }>();

const model = defineModel<string>();
</script>

<template>
  <URadioGroup v-model="model" :items :ui="{ fieldset: 'gap-y-3' }">
    <template #label="{ item }">
      <FilterLabel :label="item.label" :count="item.count" />
    </template>
  </URadioGroup>
</template>
