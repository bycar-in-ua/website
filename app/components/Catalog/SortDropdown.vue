<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { useQueryStringSort, type CatalogsSorting } from "~/composables/useQueryStringSort";
import DrawerHeader from "~/components/UI/DrawerHeader.vue";

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

const breakpoints = useBreakpoints(breakpointsTailwind);

const isDropdown = breakpoints.greater("md");

const drawerOpen = ref(false);
const drawerSortModel = ref(sort.value);

const syncDrawerSortModel = (open: boolean) => {
  if (open) {
    drawerSortModel.value = sort.value;
  }
};
</script>

<template>
  <UDropdownMenu
    v-if="isDropdown"
    :items="options"
    class="basis-full"
    :ui="{ item: 'data-highlighted:before:bg-transparent' }"
  >
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

  <UDrawer
    v-else
    v-model:open="drawerOpen"
    direction="bottom"
    inset
    :ui="{
      header: 'border-b border-gray-200 flex items-center justify-between pt-2',
      container: 'flex-1',
      body: 'py-1',
    }"
    @update:open="syncDrawerSortModel"
  >
    <UButton
      :label="orderLabels[sort || 'recommended']"
      color="secondary"
      variant="outline"
      icon="i-lucide-arrow-up-down"
      data-testid="catalog-sort-button"
    />

    <template #header>
      <DrawerHeader title="Сортування" @close="drawerOpen = false" />
    </template>

    <template #body>
      <div class="divide-y divide-gray-100">
        <div
          v-for="option in options"
          :key="option.value"
          class="py-3 font-semibold text-sm flex items-center justify-between"
          :class="drawerSortModel === option.value ? 'text-gray-950' : 'text-dimmed'"
          @click="drawerSortModel = option.value;"
        >
          <span>{{ option.label }}</span>
          <UIcon v-if="drawerSortModel === option.value" name="i-lucide-check" class="size-4.5 text-primary" />
        </div>
      </div>
    </template>

    <template #footer>
      <UButton
        label="Застосувати"
        block
        @click="sort = drawerSortModel; drawerOpen = false"
      />
    </template>
  </UDrawer>
</template>
