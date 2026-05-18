<script setup lang="ts">
import type { Filters, FiltersKeys } from "../types";
import { sortFiltersByWeight } from "../helpers";

defineProps<{ filters?: Filters; }>();
defineEmits<{ filterClick: [key: FiltersKeys]; }>();
</script>

<template>
  <div class="px-4 sm:px-6">
    <div
      v-for="(filter, key) in sortFiltersByWeight(filters)"
      :key="key"
      class="py-3 sm:py-4 flex items-center justify-between border-b border-gray-100"
      @click="$emit('filterClick', key)"
    >
      <span class="text-sm sm:text-base font-medium text-toned">{{ $t(`filters.${key}.title`) }}</span>
      <UIcon name="i-lucide-chevron-right" class="text-dimmed size-4.5" />
    </div>
  </div>
</template>
