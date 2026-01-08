<script setup lang="ts">
import type { CheckboxGroupItem } from "@nuxt/ui";
import { useFiltersStore } from "~/stores/filters";

const { t } = useI18n();

const filtersStore = useFiltersStore();

const driveTypeOptions = computed<CheckboxGroupItem[]>(
  () =>
    filtersStore.data?.filters.driveType.map((dt) => ({
      value: dt.value,
      label: `${t(`filters.drive.${dt.value}`)} (${dt.count})`,
      disabled: dt.count === 0,
    })) ?? [],
);
</script>

<template>
  <div class="max-h-40 overflow-y-auto">
    <UCheckboxGroup
      v-model="filtersStore.selectedFilters.driveType"
      :items="driveTypeOptions"
    />
  </div>
</template>
