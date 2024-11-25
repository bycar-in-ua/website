<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { BodyType } from "@bycar-in-ua/sdk";
import Collapsible from "@/components/UI/Collapsible.vue";

const { t } = useI18n();

defineProps<{ bodyTypes: BodyType[]; selectedFilters?: BodyType[] }>();

const emit = defineEmits<{
  (e: "change", checked: boolean, bodyType: BodyType): void;
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
          @change="(checked: boolean) => emit('change', checked, bodyType)"
        />
      </div>
    </template>
  </Collapsible>
</template>
