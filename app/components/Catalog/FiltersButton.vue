<script setup lang="ts">
import { useResponsiveState } from "~/composables/useResponsiveState";

defineProps<{ appliedFiltersCount?: number; }>();

const { isMobile } = useResponsiveState();
</script>

<template>
  <UButton
    :label="`Фільтр${(appliedFiltersCount || 0) > 0 ? ` (${appliedFiltersCount})` : ''}`"
    color="secondary"
    variant="outline"
    icon="i-lucide-settings-2"
    :block="isMobile"
    :size="isMobile ? 'sm' : 'md'"
  />
</template>
