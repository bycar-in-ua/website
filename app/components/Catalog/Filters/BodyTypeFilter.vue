<script setup lang="ts">
import { BodyType } from "@bycar-in-ua/sdk";
import CollapsibleTitle from "~/components/UI/CollapsibleTitle.vue";

const { t } = useI18n();

const props = defineProps<{
  bodyTypes: BodyType[];
  selectedFilters?: BodyType[];
}>();

const emit = defineEmits<{
  (e: "change", checked: boolean, bodyType: BodyType): void;
}>();

const bodyTypesWeights: Partial<Record<BodyType, number>> = {
  [BodyType.SUV]: 0,
  [BodyType.sedan]: 1,
  [BodyType.hatchback]: 2,
  [BodyType.universal]: 3,
};

const sortedBodyTypes = computed(() => {
  return [...props.bodyTypes].sort(
    (a, b) =>
      (bodyTypesWeights[a] ?? Infinity) - (bodyTypesWeights[b] ?? Infinity),
  );
});
</script>

<template>
  <UCollapsible :default-open="true" :ui="{ content: 'pl-1 pt-1 max-h-40 overflow-y-auto' }">
    <template #default="{ open }">
      <CollapsibleTitle :title="t('vehicle.bodyTypes.title')" :open />
    </template>

    <template #content>
      <UCheckbox
        v-for="bodyType in sortedBodyTypes"
        :key="bodyType"
        :label="t(`vehicle.bodyTypes.items.${bodyType}`)"
        :value="bodyType"
        :model-value="selectedFilters?.includes(bodyType)"
        class="mb-2"
        @update:model-value="(checked) => emit('change', !!checked, bodyType)"
      />
    </template>
  </UCollapsible>
</template>
