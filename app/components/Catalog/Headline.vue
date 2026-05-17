<script setup lang="ts">
import type { CatalogsSorting } from "~/utils/filters";
import SortDropdown from "./SortDropdown.vue";

const props = defineProps<{ appliedFiltersCount?: number; }>();

defineEmits<{
  (e: "filter-click"): void;
}>();

const sort = defineModel<CatalogsSorting>("sort", { required: true });

const filterButtonLabel = computed(() => {
  const count = props?.appliedFiltersCount || 0;
  return `Фільтр${count > 0 ? ` (${count})` : ""}`;
});
</script>

<template>
  <div
    class="flex sm:items-center sm:justify-between gap-4 flex-col sm:flex-row flex-wrap md:flex-nowrap"
  >
    <UButton
      :label="filterButtonLabel"
      color="secondary"
      variant="outline"
      icon="i-lucide-settings-2"
      class="mr-2 hidden md:inline-flex"
      @click="$emit('filter-click')"
    />

    <slot />

    <div class="flex w-full md:w-auto">
      <UButton
        :label="filterButtonLabel"
        color="secondary"
        variant="outline"
        icon="i-lucide-settings-2"
        class="basis-full md:hidden"
        @click="$emit('filter-click')"
      />

      <SortDropdown v-model:sort="sort" class="basis-full" />
    </div>
  </div>
</template>
