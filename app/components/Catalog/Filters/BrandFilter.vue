<script setup lang="ts">
import { useModelsCatalogFiltersStore } from "~/stores/models-catalog-filters.store";
import FilterLabel from "./FilterLabel.vue";
import type { CheckboxGroupItemWithCount } from "./types";

export type BrandFilterOption = {
  id: number;
  displayName: string;
  count: number;
  disabled?: boolean;
};

const filtersStore = useModelsCatalogFiltersStore();

const brandOptions = computed<CheckboxGroupItemWithCount[]>(
  () =>
    filtersStore.data?.filters?.brand.map((b) => ({
      label: b.displayName,
      count: b.count,
      value: String(b.id),
      disabled: b.count === 0,
    })) ?? [],
);
</script>

<template>
  <div class="max-h-40 overflow-y-auto">
    <UCheckboxGroup v-model="filtersStore.selectedFilters.brand" :items="brandOptions">
      <template #label="{ item }">
        <FilterLabel :label="item.label" :count="item.count" />
      </template>
    </UCheckboxGroup>
  </div>
</template>
