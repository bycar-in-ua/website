<script setup lang="ts">
import { useModelsCatalogFiltersStore } from "~/stores/models-catalog-filters.store";
import DrawerSlideover from "~/components/UI/DrawerSlideover.vue";
import Filters from "./Filters.vue";
import ResponsiveFilters from "./ResponsiveFilters/index.vue";
import { AppliedFilters } from "./AppliedFilters";
import DrawerHeader from "~/components/UI/DrawerHeader.vue";

const filtersStore = useModelsCatalogFiltersStore();

const isOpen = defineModel<boolean>("open", { default: false });

const handleApply = () => {
  filtersStore.applyFilters();

  isOpen.value = false;
};
</script>

<template>
  <DrawerSlideover
    v-model:open="isOpen"
    side="left"
    :dismissible="false"
    :ui="{
      header: 'border-b border-gray-200',
      body: 'p-0 sm:p-0',
      footer: 'gap-2',
    }"
  >
    <template #header="{ close, isSlideover }">
      <template v-if="isSlideover">
        <h3 class="text-lg font-bold uppercase text-default me-auto">
          Фільтри
        </h3>

        <UButton
          v-if="filtersStore.selectedFiltersCount > 0"
          variant="link"
          color="secondary"
          size="sm"
          @click="filtersStore.clearFilters"
        >
          Очистити все
        </UButton>

        <UIcon name="i-lucide-x" class="size-6 cursor-pointer ml-3" @click="() => { filtersStore.resetFilters(); close() }" />
      </template>
      <DrawerHeader
        v-else
        class="md:hidden"
        title="Фільтри"
        @close="isOpen = false"
      >
        <template #left>
          <UIcon
            name="i-lucide-chevron-left"
            class="size-6 text-dimmed"
          />
        </template>

        <template v-if="1!=1" #right>
          &nbsp;
        </template>
      </DrawerHeader>
    </template>

    <template #body="{ isSlideover }">
      <AppliedFilters v-if="filtersStore.selectedFiltersCount > 0" class="max-md:border-b border-gray-100" />
      <Filters v-if="isSlideover" />
      <ResponsiveFilters v-else />
    </template>

    <template #footer="{ isSlideover }">
      <UButton
        block
        :size="isSlideover ? 'md' : 'sm'"
        @click="handleApply"
      >
        Показати ({{ filtersStore.data?.total }})
      </UButton>

      <UButton
        v-if="!isSlideover && filtersStore.selectedFiltersCount > 0"
        label="Очистити все"
        variant="outline"
        color="secondary"
        block
        :size="isSlideover ? 'md' : 'sm'"
        @click="filtersStore.clearFilters"
      />
    </template>
  </DrawerSlideover>
</template>
