<script setup lang="ts">
import { useCatalogStore } from "~/stores/catalog";
import Filters from "./Filters.vue";
import { AppliedFilters } from "./AppliedFilters";

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
    title="Фільтри"
    :ui="{
      content: 'sm:left-6 sm:top-6 sm:bottom-6 divide-gray-200 border border-gray-200',
      title: 'text-lg font-bold uppercase text-default',
      body: 'p-0 sm:p-0 overflow-y-auto',
    }"
  >
    <template #close>
      <UIcon name="i-lucide-x size-6 cursor-pointer ms-auto" />
    </template>

    <template #body>
      <AppliedFilters />
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
