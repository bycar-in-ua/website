<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { useQueryStringSort, type CatalogsSorting } from "~/composables/useQueryStringSort";

const sort = useQueryStringSort();

const orderLabels: Record<NonNullable<CatalogsSorting>, string> = Object.freeze({
  recommended: "Рекомендовані",
  popular: "Популярні",
  price_desc: "Від найбільшої ціни",
  price_asc: "Від найменшої ціни",
  year_desc: "Від найновішого року",
  year_asc: "Від найстарішого року",
});

const orders: NonNullable<CatalogsSorting>[] = [
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
    active: sort.value === order,
    onSelect: () => {
      sort.value = order;
    },
  }),
));
</script>

<template>
  <UDropdownMenu :items="options" class="basis-full">
    <UButton
      :label="orderLabels[sort || 'recommended']"
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
