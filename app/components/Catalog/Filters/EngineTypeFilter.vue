<script setup lang="ts">
import type { CheckboxGroupItem } from "@nuxt/ui";
import { useFiltersStore } from "~/stores/filters";

const { t } = useI18n();

const filtersStore = useFiltersStore();

const engineTypeOptions = computed<CheckboxGroupItem[]>(
  () =>
    filtersStore.data?.filters.engineType.map((et) => ({
      value: et.value,
      label: `${t(`filters.engineType.${et.value}`)} (${et.count})`,
      disabled: et.count === 0,
    })) ?? [],
);
</script>

<template>
  <div class="max-h-40 overflow-y-auto">
    <UCheckboxGroup v-model="filtersStore.selectedFilters.engineType" :items="engineTypeOptions" />

    <!-- <UCheckbox
      v-for="engineType in engineTypes"
      :key="engineType.value"
      :label="`${t(`filters.engineType.${engineType.value}`)} (${engineType.count})`"
      :value="engineType.value"
      :model-value="selectedFilters?.includes(engineType.value)"
      :disabled="engineType.disabled"
      class="mb-2"
      @update:model-value="(checked) => emit('change', !!checked, engineType.value)"
    /> -->
  </div>
</template>
