<script setup lang="ts" generic="FiltersSchema">
import DrawerSlideover from "~/components/UI/DrawerSlideover.vue";
import DrawerHeader from "~/components/UI/DrawerHeader.vue";
import { useFilters } from "~/composables/useFilters";
import type { FiltersKeys } from "./types";
import Filters from "./Filters.vue";
import ResponsiveFilters from "./ResponsiveFilters/index.vue";
import { AppliedFilters } from "./AppliedFilters";

const isOpen = defineModel<boolean>("open", { default: false });

const {
  data,
  applyFilters,
  clearFilters,
  resetSelectedFilters,
  selectedFiltersCount,
} = useFilters();

const handleApply = () => {
  applyFilters();

  isOpen.value = false;
};

const responsiveFilterView = ref<FiltersKeys | undefined>();
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
          v-if="selectedFiltersCount > 0"
          variant="link"
          color="secondary"
          size="sm"
          @click="clearFilters(); isOpen = false"
        >
          Очистити все
        </UButton>

        <UIcon name="i-lucide-x" class="size-6 cursor-pointer ml-3" @click="() => { resetSelectedFilters(); close() }" />
      </template>
      <DrawerHeader
        v-else
        class="md:hidden"
        :title="responsiveFilterView ? $t(`filters.${responsiveFilterView}.title`) : 'Фільтри'"
        @close="isOpen = false"
      >
        <template #left>
          <UIcon
            v-if="responsiveFilterView"
            name="i-lucide-chevron-left"
            class="size-6 text-dimmed"
            @click="responsiveFilterView = undefined"
          />
        </template>

        <template v-if="responsiveFilterView" #right>
          &nbsp;
        </template>
      </DrawerHeader>
    </template>

    <template #body="{ isSlideover }">
      <AppliedFilters v-if="selectedFiltersCount > 0" class="max-md:border-b border-gray-100" />
      <Filters v-if="isSlideover" />
      <ResponsiveFilters v-else v-model:filter="responsiveFilterView" :filters="data?.filters" />
    </template>

    <template #footer="{ isSlideover }">
      <UButton
        block
        :size="isSlideover ? 'md' : 'sm'"
        @click="handleApply"
      >
        Показати ({{ data?.total }})
      </UButton>

      <UButton
        v-if="!isSlideover && selectedFiltersCount > 0"
        label="Очистити все"
        variant="outline"
        color="secondary"
        block
        :size="isSlideover ? 'md' : 'sm'"
        @click="clearFilters"
      />
    </template>
  </DrawerSlideover>
</template>
