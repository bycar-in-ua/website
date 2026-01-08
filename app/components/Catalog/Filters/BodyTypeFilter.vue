<script setup lang="ts">
import type { CheckboxGroupItem } from "@nuxt/ui";
import { useFiltersStore } from "~/stores/filters";

const { t } = useI18n();

const filtersStore = useFiltersStore();

const bodyTypeOptions = computed<CheckboxGroupItem[]>(
  () =>
    filtersStore.data?.filters.bodyType.map((bt) => ({
      value: bt.value,
      label: `${t(`vehicle.bodyTypes.items.${bt.value}`)} (${bt.count})`,
      disabled: bt.count === 0,
    })) ?? [],
);
</script>

<template>
  <div class="max-h-40 overflow-y-auto">
    <UCheckboxGroup v-model="filtersStore.selectedFilters.bodyType" :items="bodyTypeOptions" />
  </div>
</template>
