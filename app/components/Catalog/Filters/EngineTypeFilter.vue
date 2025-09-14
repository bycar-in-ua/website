<script setup lang="ts">
import type { VehiclesFilters } from "@bycar-in-ua/sdk";
import CollapsibleTitle from "~/components/UI/CollapsibleTitle.vue";

const { t } = useI18n();

defineProps<{ selectedFilters?: VehiclesFilters["engineType"]; }>();

const emit = defineEmits<{
  (e: "change", checked: boolean, engineType: string): void;
}>();

const engineTypes: NonNullable<VehiclesFilters["engineType"]> = [
  "gas",
  "dt",
  "hybrid",
  "electric",
];
</script>

<template>
  <UCollapsible :default-open="true" :ui="{ content: 'pl-1 pt-1 max-h-40 overflow-y-auto' }">
    <template #default="{ open }">
      <CollapsibleTitle :title="t('filters.engineType.title')" :open />
    </template>

    <template #content>
      <UCheckbox
        v-for="engineType in engineTypes"
        :key="engineType"
        :label="t(`filters.engineType.${engineType}`)"
        :value="engineType"
        :model-value="selectedFilters?.includes(engineType)"
        class="mb-2"
        @update:model-value="(checked) => emit('change', !!checked, engineType)"
      />
    </template>
  </UCollapsible>
</template>
