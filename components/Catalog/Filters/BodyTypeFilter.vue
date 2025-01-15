<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { BodyType } from "@bycar-in-ua/sdk";
import Collapsible from "@/components/UI/Collapsible.vue";

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
  <Collapsible :title="t('vehicle.bodyTypes.title')" :default-open="true">
    <template #content>
      <div class="max-h-32 overflow-y-auto">
        <UCheckbox
          v-for="bodyType in sortedBodyTypes"
          :key="bodyType"
          :label="t(`vehicle.bodyTypes.items.${bodyType}`)"
          :value="bodyType"
          :model-value="selectedFilters"
          class="mb-2"
          @change="(checked: boolean) => emit('change', checked, bodyType)"
        />
      </div>
    </template>
  </Collapsible>
</template>
