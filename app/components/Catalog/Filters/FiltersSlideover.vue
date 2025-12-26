<script setup lang="ts">
import Filters from "./Filters.vue";
import { useCatalogStore } from "~/stores/catalog";

const catalogStore = useCatalogStore();
const { t } = useI18n();

const isOpen = defineModel<boolean>("open", { default: false });

const handleClearAll = () => {
  catalogStore.clearFilters();
};

const handleApply = () => {
  isOpen.value = false;
};
</script>

<template>
  <USlideover
    v-model:open="isOpen"
    side="left"
    :inset="false"
    :overlay="true"
    :transition="true"
    :dismissible="false"
    title="ФІЛЬТРИ"
    :ui="{
      content: 'left-6 top-6 bottom-6',
      body: 'p-0 sm:p-0 overflow-y-auto',
    }"
  >
    <template #body>
      <Filters />
    </template>

    <template #footer>
      <UButton
        block
        trailing
        @click="handleApply"
      >
        ЗАСТОСУВАТИ
      </UButton>

      <UButton
        v-if="catalogStore.appliedFilters.length > 0"
        variant="ghost"
        size="sm"
        block
        @click="handleClearAll"
      >
        {{ t("filters.clearAll") }}
      </UButton>
    </template>
  </USlideover>
</template>
