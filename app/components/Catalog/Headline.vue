<script setup lang="ts">
import type { SearchVehiclesInput } from "@bycar-in-ua/vehicles-sdk";
import type { DropdownMenuItem } from "@nuxt/ui";
import { useFiltersStore } from "~/stores/filters";
import { useCatalogStore } from "~/stores/catalog";

defineEmits<{
  (e: "filter-click"): void;
}>();

const { t } = useI18n();

const filtersStore = useFiltersStore();
const catalogStore = useCatalogStore();

type OrderOption = NonNullable<NonNullable<SearchVehiclesInput["sort"]>["field"]>;

const orderLabels: Record<OrderOption, string> = Object.freeze({
  recommended: "Рекомендовані",
  popular: "Популярні",
  price_desc: "Від найбільшої ціни",
  price_asc: "Від найменшої ціни",
  year_desc: "Від найновішого року",
  year_asc: "Від найстарішого року",
});

const orders: OrderOption[] = [
  "recommended",
  "price_asc",
  "price_desc",
  "year_desc",
  "year_asc",
] as const;

const options = computed<DropdownMenuItem[]>(() => orders.map(
  (order) => ({
    label: orderLabels[order],
    value: order,
    active: catalogStore.order?.field === order,
    onSelect: () => {
      catalogStore.order = { field: order };
    },
  }),
));

const quickFilters = computed(() => filtersStore.data?.filters?.bodyType?.filter((filter) => filter.count > 0) || []);

const toggleQuickFilter = (value: string) => {
  if (filtersStore.selectedFilters.bodyType?.includes(value)) {
    filtersStore.removeFilter("bodyType", value);
  } else {
    filtersStore.selectedFilters.bodyType?.push(value);
  }

  filtersStore.applyFilters();
};

const filterButtonLabel = computed(() => {
  const count = filtersStore.appliedFiltersCount;
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
    <div class="flex gap-1.5 items-center overflow-x-auto max-w-full grow no-scrollbar">
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
        :label="filterButtonLabel"
        color="secondary"
        variant="outline"
        icon="i-lucide-settings-2"
        class="basis-full md:hidden"
        @click="$emit('filter-click')"
      />

      <UDropdownMenu :items="options" class="basis-full">
        <UButton
          :label="orderLabels[catalogStore.order?.field || 'recommended']"
          color="secondary"
          variant="outline"
          icon="i-lucide-arrow-up-down"
        />

        <template #item-trailing="{ active }">
          <UIcon
            name="i-lucide-check"
            class="text-primary size-4"
            :class="{ 'opacity-0': !active }"
          />
        </template>
      </UDropdownMenu>
    </div>
  </div>
</template>
