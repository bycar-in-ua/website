<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Collapsible from "@/components/UI/Collapsible.vue";

const { t } = useI18n();

defineProps<{
  brands: { id: number; displayName: string }[];
  selectedFilters?: number[];
}>();

const emit = defineEmits<{
  (e: "change", checked: boolean, brandId: number): void;
}>();
</script>

<template>
  <Collapsible :title="t('brand')" :default-open="true">
    <template #content>
      <div class="max-h-32 overflow-y-auto">
        <UCheckbox
          v-for="brand in brands"
          :key="brand.id"
          :label="brand.displayName"
          :value="brand.id"
          :model-value="selectedFilters"
          class="mb-2"
          @change="(checked: boolean) => emit('change', checked, brand.id)"
        />
      </div>
    </template>
  </Collapsible>
</template>
