<script setup lang="ts">
import { useResponsiveState } from "~/composables/useResponsiveState";

const {
  headerHeight, isHeaderHidden, isScrolled,
} = useResponsiveState();

const filtersTranslate = computed(() => isScrolled.value && !isHeaderHidden.value ? `${headerHeight.value}px` : "0px");
</script>

<template>
  <div
    class="catalog-headline py-4 mb-2 sm:mb-4 sticky top-0 z-30 bg-default"
  >
    <slot />
  </div>
</template>

<style>
.catalog-headline {
  top: v-bind(filtersTranslate);
}
</style>
