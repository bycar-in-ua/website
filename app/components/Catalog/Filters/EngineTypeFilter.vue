<script setup lang="ts">
import { useModelsCatalogFiltersStore } from "~/stores/models-catalog-filters.store";
import FilterLabel from "./FilterLabel.vue";
import type { CheckboxGroupItemWithCount } from "./types";

const { t } = useI18n();

const filtersStore = useModelsCatalogFiltersStore();

const engineTypeOptions = computed<CheckboxGroupItemWithCount[]>(
  () =>
    filtersStore.data?.filters.engineType.map((et) => ({
      value: et.value,
      label: t(`filters.engineType.${et.value}`),
      count: et.count,
      disabled: et.count === 0,
    })) ?? [],
);
</script>

<template>
  <div class="max-h-40 overflow-y-auto">
    <UCheckboxGroup v-model="filtersStore.selectedFilters.engineType" :items="engineTypeOptions">
      <template #label="{ item }">
        <FilterLabel :label="item.label" :count="item.count" />
      </template>
    </UCheckboxGroup>
  </div>
</template>
