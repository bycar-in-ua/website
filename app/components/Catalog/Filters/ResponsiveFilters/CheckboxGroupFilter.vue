<script setup lang="ts">
import type { ListFilterDefinition } from "~/utils/filters";
import FilterLabel from "../FilterLabel.vue";
import ApplyButton from "./ApplyButton.vue";

const props = defineProps<{ filter: ListFilterDefinition; }>();

const { selectedFilters, responsiveFilterView } = useFilters();

const model = ref(selectedFilters.value[props.filter.key as keyof UnifiedFiltersSchema] as string[] ?? []);

const handleApply = () => {
  // For checlsit filters - filter key is effectively a payload schema key
  const key = props.filter.key as keyof UnifiedFiltersSchema;

  if (!selectedFilters.value[key]) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  selectedFilters.value[key] = model.value;
  responsiveFilterView.value = undefined;
};
</script>

<template>
  <UCheckboxGroup v-model="model" :items="filter.options" :ui="{ item: 'flex-row-reverse py-3 border-b border-gray-100' }">
    <template #label="{ item }">
      <FilterLabel :label="item.label" :count="item.count" />
    </template>
  </UCheckboxGroup>

  <Teleport to=".filters-footer">
    <ApplyButton @click="handleApply" />
  </Teleport>
</template>
