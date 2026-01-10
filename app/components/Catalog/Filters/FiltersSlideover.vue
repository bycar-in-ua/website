<script setup lang="ts">
import { useFiltersStore } from "~/stores/filters";
import Filters from "./Filters.vue";
import { AppliedFilters } from "./AppliedFilters";

const filtersStore = useFiltersStore();

const isOpen = defineModel<boolean>("open", { default: false });

const handleApply = () => {
  filtersStore.applyFilters();

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
    :ui="{
      content: 'sm:left-6 sm:top-6 sm:bottom-6 divide-gray-200 border border-gray-200',
      title: '',
      header: 'flex items-center justify-end',
      body: 'p-0 sm:p-0 overflow-y-auto',
    }"
  >
    <template #header="{ close }">
      <h3 class="text-lg font-bold uppercase text-default me-auto">
        Фільтри
      </h3>

      <UButton
        v-if="filtersStore.appliedFiltersCount > 0"
        variant="ghost"
        color="secondary"
        size="sm"
        @click="filtersStore.clearFilters"
      >
        Очистити все
      </UButton>

      <UIcon name="i-lucide-x" class="size-6 cursor-pointer" @click="() => { filtersStore.resetFilters(); close() }" />
    </template>

    <template #body>
      <AppliedFilters v-if="filtersStore.appliedFiltersCount > 0" />
      <Filters />
    </template>

    <template #footer>
      <UButton
        block
        trailing
        @click="handleApply"
      >
        Показати ({{ filtersStore.data?.total }})
      </UButton>
    </template>
  </USlideover>
</template>
