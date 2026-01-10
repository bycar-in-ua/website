<script setup lang="ts">
import type { VehiclesOrder } from "@bycar-in-ua/sdk";
import type { DropdownMenuItem } from "@nuxt/ui";
import { useFiltersStore } from "~/stores/filters";

defineEmits<{
  (e: "filter-click"): void;
}>();

const { t } = useI18n();

const filtersStore = useFiltersStore();

const orders: VehiclesOrder[] = [
  "price-asc",
  "price-desc",
  "yearFrom-desc",
  "yearFrom-asc",
];

const options: DropdownMenuItem[] = orders.map(
  (order) => ({
    label: t(`orders.${order}`),
    value: order,
  }),
);

const quickFilters = computed(() => filtersStore.data?.filters.bodyType.filter((filter) => filter.count > 0) || []);

const toggleQuickFilter = (value: string) => {
  if (filtersStore.selectedFilters.bodyType?.includes(value)) {
    filtersStore.removeFilter("bodyType", value);
  } else {
    filtersStore.selectedFilters.bodyType?.push(value);
  }

  filtersStore.applyFilters();
};
</script>

<template>
  <div
    class="flex sm:items-center sm:justify-between gap-4 flex-col sm:flex-row flex-wrap md:flex-nowrap"
  >
    <div class="flex gap-1.5 items-center overflow-x-auto max-w-full grow">
      <UButton
        :label="`Фільтр ${filtersStore.appliedFiltersCount > 0 ? `(${filtersStore.appliedFiltersCount})` : ''}`"
        color="secondary"
        variant="outline"
        icon="i-lucide-settings-2"
        class="mr-2 hidden md:inline-flex"
        @click="$emit('filter-click')"
      />

      <UButton
        v-for="item in quickFilters"
        :key="item.value"
        :label="`${t(`vehicle.bodyTypes.items.${item.value}`)} (${item.count})`"
        :color="filtersStore.selectedFilters.bodyType?.includes(item.value) ? 'primary' : 'secondary'"
        variant="outline"
        class="capitalize"
        @click="toggleQuickFilter(item.value)"
      />
    </div>

    <div class="flex w-full md:w-auto">
      <UButton
        label="Фільтр (2)"
        color="secondary"
        variant="outline"
        icon="i-lucide-settings-2"
        class="basis-full md:hidden"
        @click="$emit('filter-click')"
      />

      <UDropdownMenu :items="options" class="basis-full">
        <UButton
          label="Рекомендовані"
          color="secondary"
          variant="outline"
          icon="i-lucide-arrow-up-down"
        />
      </UDropdownMenu>
    </div>
  </div>
</template>
