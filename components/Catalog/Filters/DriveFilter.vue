<script setup lang="ts">
import Collapsible from "@/components/UI/Collapsible.vue";

const { t } = useI18n();

defineProps<{ selectedFilters?: string[] }>();

const emit = defineEmits<{
  (e: "change", checked: boolean, drive: string): void;
}>();

const drives = ["FWD", "RWD", "AWD"];
</script>

<template>
  <Collapsible :title="t('filters.drive.title')" :default-open="true">
    <template #content>
      <UCheckbox
        v-for="drive in drives"
        :key="drive"
        :label="t(`filters.drive.${drive}`)"
        :value="drive"
        :model-value="selectedFilters"
        class="mb-2"
        @change="(checked: boolean) => emit('change', checked, drive)"
      />
    </template>
  </Collapsible>
</template>
