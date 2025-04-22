<script setup lang="ts">
import { useCatalogStore, type FiltersState } from "@/stores/catalog.js";

const { t } = useI18n();

const catalogStore = useCatalogStore();

const removeFilterHandler = (
  key: keyof FiltersState,
  value: string | number,
) => {
  if (key === "priceFrom" || key === "priceTo") {
    catalogStore.updateFilters(key, undefined);
    return;
  }

  catalogStore.updateFilters(
    key,
    catalogStore.filters[key]?.filter((item) => item !== value),
  );
};
</script>

<template>
  <div class="flex flex-wrap gap-1 items-center min-h-6">
    <UButton
      v-for="(item, i) in catalogStore.appliedFilters"
      :key="i"
      :label="item.label"
      icon="i-heroicons-x-mark"
      trailing
      variant="outline"
      size="xs"
      @click="removeFilterHandler(item.key, item.value)"
    />

    <UButton
      v-if="catalogStore.appliedFilters.length > 1"
      :label="t('filters.clearAll')"
      icon="i-heroicons-x-mark"
      trailing
      variant="ghost"
      size="xs"
      @click="catalogStore.clearFilters"
    />
  </div>
</template>
