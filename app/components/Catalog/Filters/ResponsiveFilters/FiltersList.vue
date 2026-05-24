<script setup lang="ts">
import { useFilters } from "~/composables/useFilters";
import type { FilterDefinition } from "~/utils/filters";

defineProps<{ filters: FilterDefinition[]; }>();

const { responsiveFilterView } = useFilters();
</script>

<template>
  <div class="px-4 sm:px-6">
    <div
      v-for="filter in filters"
      :key="filter.key"
      class="py-3 sm:py-4 flex items-center justify-between border-b border-gray-100"
      @click="responsiveFilterView = filter.key"
    >
      <span class="text-sm sm:text-base font-medium text-toned">{{ filter.label }}</span>
      <UIcon name="i-lucide-chevron-right" class="text-dimmed size-4.5" />
    </div>
  </div>
</template>
