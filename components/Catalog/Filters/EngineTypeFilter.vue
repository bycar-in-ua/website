<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { VehiclesFilters } from "@bycar-in-ua/sdk";
import Collapsible from "@/components/UI/Collapsible.vue";

const { t } = useI18n();

defineProps<{ selectedFilters?: VehiclesFilters["engineType"] }>();

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
  <Collapsible :title="t('filters.engineType.title')" :default-open="true">
    <template #content>
      <UCheckbox
        v-for="engineType in engineTypes"
        :key="engineType"
        :label="t(`filters.engineType.${engineType}`)"
        :value="engineType"
        :model-value="selectedFilters"
        class="mb-2"
        @change="(checked: boolean) => emit('change', checked, engineType)"
      />
    </template>
  </Collapsible>
</template>
