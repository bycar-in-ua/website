<script setup lang="ts">
import { useFiltersStore } from "~/stores/filters";
import type { CheckboxGroupItem } from "@nuxt/ui";

export type BrandFilterOption = {
  id: number;
  displayName: string;
  count: number;
  disabled?: boolean;
};

const filtersStore = useFiltersStore();

const brandOptions = computed<CheckboxGroupItem[]>(
  () =>
    filtersStore.data?.filters?.brand.map((b) => ({
      label: `${b.displayName} (${b.count})`,
      value: String(b.id),
      disabled: b.count === 0,
    })) ?? [],
);
</script>

<template>
  <div class="max-h-40 overflow-y-auto">
    <UCheckboxGroup v-model="filtersStore.selectedFilters.brand" :items="brandOptions" />
  </div>
</template>
