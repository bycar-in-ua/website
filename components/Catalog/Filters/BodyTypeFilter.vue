<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { BodyType } from "@bycar-in-ua/sdk";
import Collapsible from "@/components/UI/Collapsible.vue";

const { t } = useI18n();

defineProps({
  bodyTypes: {
    type: Array as () => BodyType[],
    required: true,
  },
  selectedFilters: {
    type: Array as () => BodyType[],
  },
});

const emit = defineEmits<{
  (e: "changeCheckbox", checked: boolean, bodyType: BodyType): void;
}>();
</script>

<template>
  <Collapsible :title="t('vehicle.bodyTypes.title')" :default-open="true">
    <template #content>
      <div class="max-h-32 overflow-y-auto">
        <UCheckbox
          v-for="bodyType in bodyTypes"
          :key="bodyType"
          :label="t(`vehicle.bodyTypes.items.${bodyType}`)"
          :value="bodyType"
          :model-value="selectedFilters"
          class="mb-2"
          @change="(checked: boolean) => emit('changeCheckbox', checked, bodyType)"
        />
      </div>
    </template>
  </Collapsible>
</template>
