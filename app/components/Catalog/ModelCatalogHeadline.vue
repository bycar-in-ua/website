<script setup lang="ts">
import { useResponsiveState } from "~/composables/useResponsiveState";
import ModelsQuickFilters from "./ModelsQuickFilters.vue";
import SortDropdown from "./SortDropdown.vue";
import HeadlineStickyContainer from "./HeadlineStickyContainer.vue";
import FiltersButton from "./FiltersButton.vue";

const props = defineProps<{ appliedFiltersCount?: number; }>();

defineEmits<{
  (e: "filter-click"): void;
}>();

const { isMobile } = useResponsiveState();
</script>

<template>
  <ModelsQuickFilters v-if="isMobile" class="mt-8 sm:mt-12" />

  <HeadlineStickyContainer class="container mt-2 md:mt-12 flex items-center sm:justify-between sm:gap-4 flex-nowrap">
    <FiltersButton :applied-filters-count="appliedFiltersCount" class="shrink-0 max-md:basis-1/2" @click="$emit('filter-click')" />

    <ModelsQuickFilters v-if="!isMobile" class="grow" />

    <SortDropdown class="shrink-0 max-md:basis-1/2" />
  </HeadlineStickyContainer>
</template>
