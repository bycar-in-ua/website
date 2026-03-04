<script setup lang="ts">
import { useFiltersStore } from "~/stores/filters";
import FilterLabel from "./FilterLabel.vue";
import type { CheckboxGroupItemWithCount } from "./types";

const { t } = useI18n();

const filtersStore = useFiltersStore();

const driveTypeOptions = computed<CheckboxGroupItemWithCount[]>(
  () =>
    filtersStore.data?.filters.driveType.map((dt) => ({
      value: dt.value,
      label: t(`filters.drive.${dt.value}`),
      count: dt.count,
      disabled: dt.count === 0,
    })) ?? [],
);
</script>

<template>
  <div class="max-h-40 overflow-y-auto">
    <UCheckboxGroup
      v-model="filtersStore.selectedFilters.driveType"
      :items="driveTypeOptions"
    >
      <template #label="{ item }">
        <FilterLabel :label="item.label" :count="item.count" />
      </template>
    </UCheckboxGroup>
  </div>
</template>
