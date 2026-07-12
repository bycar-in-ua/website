<script setup lang="ts">
import ResponsiveHorizontalScrollable from "~/components/UI/ResponsiveHorizontalScrollable.vue";
import { useFilters } from "~/composables/useFilters";

const {
  data, selectedFilters, removeSelectedFilter, applyFilters,
} = useFilters();

const quickFilters = computed(() => data.value?.filters?.bodyType?.filter((filter) => filter.count > 0) || []);

const toggleQuickFilter = (value: string) => {
  if (selectedFilters.value.bodyType?.includes(value)) {
    removeSelectedFilter("bodyType", value);
  } else {
    selectedFilters.value.bodyType = [...(selectedFilters.value.bodyType || []), value];
  }

  applyFilters();
};
</script>

<template>
  <ResponsiveHorizontalScrollable class="flex gap-1.5 items-center">
    <UButton
      v-for="item in quickFilters"
      :key="item.value"
      :label="`${$t(`vehicle.bodyTypes.items.${item.value}`)} (${item.count})`"
      :color="selectedFilters.bodyType?.includes(item.value) ? 'primary' : 'secondary'"
      variant="outline"
      class="capitalize"
      @click="toggleQuickFilter(item.value)"
    />
  </ResponsiveHorizontalScrollable>
</template>
