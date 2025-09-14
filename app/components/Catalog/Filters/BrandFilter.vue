<script setup lang="ts">
import CollapsibleTitle from "~/components/UI/CollapsibleTitle.vue";

const { t } = useI18n();

defineProps<{
  brands: { id: number;
    displayName: string; }[];
  selectedFilters?: number[];
}>();

const emit = defineEmits<{
  (e: "change", checked: boolean, brandId: number): void;
}>();
</script>

<template>
  <UCollapsible :default-open="true" :ui="{ content: 'pl-1 pt-1 max-h-40 overflow-y-auto' }">
    <template #default="{ open }">
      <CollapsibleTitle :title="t('brand')" :open />
    </template>

    <template #content>
      <UCheckbox
        v-for="brand in brands"
        :key="brand.id"
        :label="brand.displayName"
        :value="brand.id"
        :model-value="selectedFilters?.includes(brand.id)"
        class="mb-2"
        @update:model-value="(checked) => emit('change', !!checked, brand.id)"
      />
    </template>
  </UCollapsible>
</template>
