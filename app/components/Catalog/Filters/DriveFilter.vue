<script setup lang="ts">
import CollapsibleTitle from "~/components/UI/CollapsibleTitle.vue";

const { t } = useI18n();

defineProps<{ selectedFilters?: string[]; }>();

const emit = defineEmits<{
  (e: "change", checked: boolean, drive: string): void;
}>();

const drives = [
  "FWD", "RWD", "AWD",
];
</script>

<template>
  <UCollapsible :default-open="true" :ui="{ content: 'pl-1 pt-1 max-h-40 overflow-y-auto' }">
    <template #default="{ open }">
      <CollapsibleTitle :title="t('filters.drive.title')" :open />
    </template>

    <template #content>
      <UCheckbox
        v-for="drive in drives"
        :key="drive"
        :label="t(`filters.drive.${drive}`)"
        :value="drive"
        :model-value="selectedFilters?.includes(drive)"
        class="mb-2"
        @update:model-value="(checked) => emit('change', !!checked, drive)"
      />
    </template>
  </UCollapsible>
</template>
