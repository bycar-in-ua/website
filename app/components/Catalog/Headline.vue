<script setup lang="ts">
import { useCatalogStore } from "~/stores/catalog.js";
import AppliedFilters from "./AppliedFilters.vue";
import type { VehiclesOrder } from "@bycar-in-ua/sdk";

const { t } = useI18n();

const orders: VehiclesOrder[] = [
  "price-asc",
  "price-desc",
  "yearFrom-desc",
  "yearFrom-asc",
];

const options: Array<{ label: string;
  value: VehiclesOrder; }> = orders.map(
  (order) => ({
    label: t(`orders.${order}`),
    value: order,
  }),
);

const catalogStore = useCatalogStore();

function handleClearOrder() {
  catalogStore.order = undefined;
}
</script>

<template>
  <div
    class="flex sm:items-center sm:justify-between gap-4 flex-col sm:flex-row flex-wrap"
  >
    <div class="flex gap-4 items-center">
      <h2 class="font-semibold text-2xl md:text-3xl">
        {{ t("catalog.title") }}
      </h2>
    </div>

    <USelectMenu
      v-model="catalogStore.order"
      placeholder="Сортувати"
      :items="options"
      variant="none"
      value-key="value"
      :search-input="false"
      :ui="{
        base: `w-full max-w-80 justify-end cursor-pointer mr-8 md:mr-0 ${
          catalogStore.order ? 'pe-14' : 'pe-9'
        }`,
      }"
    >
      <template #trailing>
        <UIcon name="i-heroicons:chevron-down-20-solid" class="w-5 h-5" />

        <UButton
          v-if="catalogStore.order"
          icon="i-heroicons-x-mark"
          class="pointer-events-auto w-5 h-5 p-0 text-black-500"
          variant="ghost"
          @click.prevent="handleClearOrder"
        />
      </template>
    </USelectMenu>

    <AppliedFilters class="basis-full" />
  </div>
</template>
