<script setup lang="ts">
import type { SearchVehiclesInput } from "@bycar-in-ua/vehicles-sdk";
import type { DropdownMenuItem } from "@nuxt/ui";

type SortOption = NonNullable<NonNullable<SearchVehiclesInput["sort"]>["field"]>;

const sortModel = defineModel<SortOption | undefined>("sort");

const orderLabels: Record<SortOption, string> = Object.freeze({
  recommended: "Рекомендовані",
  popular: "Популярні",
  price_desc: "Від найбільшої ціни",
  price_asc: "Від найменшої ціни",
  year_desc: "Від найновішого року",
  year_asc: "Від найстарішого року",
});

const orders: SortOption[] = [
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
    active: sortModel.value === order,
    onSelect: () => {
      sortModel.value = order;
    },
  }),
));
</script>

<template>
  <UDropdownMenu :items="options" class="basis-full">
    <UButton
      :label="orderLabels[sortModel || 'recommended']"
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
</template>
