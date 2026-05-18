<script setup lang="ts">
import { useFilters } from "~/composables/useFilters";
import FilterLabel from "./FilterLabel.vue";
import type { CheckboxGroupItemWithCount } from "./types";

const { t } = useI18n();

const { data, selectedFilters } = useFilters();

const bodyTypeOptions = computed<CheckboxGroupItemWithCount[]>(
  () =>
    data.value?.filters.bodyType.map((bt) => ({
      value: bt.value,
      label: t(`vehicle.bodyTypes.items.${bt.value}`),
      count: bt.count,
      disabled: bt.count === 0,
    })) ?? [],
);
</script>

<template>
  <div class="max-h-40 overflow-y-auto">
    <UCheckboxGroup v-model="selectedFilters.bodyType" :items="bodyTypeOptions">
      <template #label="{ item }">
        <FilterLabel :label="item.label" :count="item.count" />
      </template>
    </UCheckboxGroup>
  </div>
</template>
