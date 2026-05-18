<script setup lang="ts">
import { useFilters } from "~/composables/useFilters";
import FilterLabel from "./FilterLabel.vue";
import type { CheckboxGroupItemWithCount } from "./types";

const { t } = useI18n();

const { data, selectedFilters } = useFilters();

const engineTypeOptions = computed<CheckboxGroupItemWithCount[]>(
  () =>
    data.value?.filters.engineType.map((et) => ({
      value: et.value,
      label: t(`filters.engineType.${et.value}`),
      count: et.count,
      disabled: et.count === 0,
    })) ?? [],
);
</script>

<template>
  <div class="max-h-40 overflow-y-auto">
    <UCheckboxGroup v-model="selectedFilters.engineType" :items="engineTypeOptions">
      <template #label="{ item }">
        <FilterLabel :label="item.label" :count="item.count" />
      </template>
    </UCheckboxGroup>
  </div>
</template>
