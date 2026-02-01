<script setup lang="ts">
import type { CheckboxGroupItem } from "@nuxt/ui";
import { useFiltersStore } from "~/stores/filters";

const { t } = useI18n();
const filtersStore = useFiltersStore();

const bodyTypeOptions = computed<CheckboxGroupItem[]>(() => filtersStore.data?.filters.bodyType.map((bt) => ({
  value: bt.value,
  label: t(`vehicle.bodyTypes.items.${bt.value}`),
  disabled: bt.count === 0,
})) ?? [],
);

const allCheckboxModel = computed({
  get: () => !filtersStore.selectedFilters.bodyType?.length,
  set: (value: boolean) => {
    if (value) {
      filtersStore.selectedFilters.bodyType = [];
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
    v-model="filtersStore.selectedFilters.bodyType"
    :items="bodyTypeOptions"
    indicator="end"
    :ui="{ item: 'mb-2 pb-2', fieldset: 'gap-y-0 divide-y divide-gray-100' }"
  />
</template>
