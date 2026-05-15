<script setup lang="ts">
import type { SearchAvailableVehiclesInput } from "@bycar-in-ua/vehicles-sdk";
import type { DropdownMenuItem } from "@nuxt/ui";

defineEmits<{ (e: "filter-click"): void; }>();

type OrderOption = NonNullable<NonNullable<SearchAvailableVehiclesInput["sort"]>["field"]>;

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
    active: false,
    onSelect: () => {
      // catalogStore.order = { field: order };
    },
  }),
));

const filterButtonLabel = computed(() => {
  const count = 1;
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
          :label="orderLabels['recommended']"
          color="secondary"
          variant="outline"
          icon="i-lucide-arrow-up-down"
          data-testid="catalog-sort-button"
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
