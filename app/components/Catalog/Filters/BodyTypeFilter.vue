<script setup lang="ts">
import { useFiltersStore } from "~/stores/filters";
import FilterLabel from "./FilterLabel.vue";
import type { CheckboxGroupItemWithCount } from "./types";

const { t } = useI18n();

const filtersStore = useFiltersStore();

const bodyTypeOptions = computed<CheckboxGroupItemWithCount[]>(
  () =>
    filtersStore.data?.filters.bodyType.map((bt) => ({
      value: bt.value,
      label: t(`vehicle.bodyTypes.items.${bt.value}`),
      count: bt.count,
      disabled: bt.count === 0,
    })) ?? [],
);
</script>

<template>
  <div class="max-h-40 overflow-y-auto">
    <UCheckboxGroup v-model="filtersStore.selectedFilters.bodyType" :items="bodyTypeOptions">
      <template #label="{ item }">
        <FilterLabel :label="item.label" :count="item.count" />
      </template>
    </UCheckboxGroup>
  </div>
</template>
