<script setup lang="ts">
import type { CheckboxGroupItem } from "@nuxt/ui";
import { useFiltersStore } from "~/stores/filters";

const filtersStore = useFiltersStore();

const brandsOptions = computed<CheckboxGroupItem[]>(() => filtersStore.data?.filters.brand.map((bt) => ({
  value: bt.id.toString(),
  label: bt.displayName,
  disabled: bt.count === 0,
})) ?? [],
);

const allCheckboxModel = computed({
  get: () => !filtersStore.selectedFilters.brand?.length,
  set: (value: boolean) => {
    if (value) {
      filtersStore.selectedFilters.brand = [];
    }
  },
});
</script>

<template>
  <UCheckbox
    v-model="allCheckboxModel"
    label="Всі"
    indicator="end"
    class="mb-2 pb-2 border-b border-gray-100"
  />
  <UCheckboxGroup
    v-model="filtersStore.selectedFilters.brand"
    :items="brandsOptions"
    indicator="end"
    :ui="{ item: 'mb-2 pb-2', fieldset: 'gap-y-0 divide-y divide-gray-100' }"
  />
</template>
