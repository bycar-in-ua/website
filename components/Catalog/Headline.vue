<script setup lang="ts">
import { useCatalogStore } from "@/stores/catalog.js";
import AppliedFilters from "./AppliedFilters.vue";
import type { VehiclesOrder } from "@bycar-in-ua/sdk";
import Quiz from "../Quiz/Quiz.vue";

const { t } = useI18n();

const orders: VehiclesOrder[] = [
  "price-asc",
  "price-desc",
  "yearFrom-desc",
  "yearFrom-asc",
];

const options: Array<{ label: string; value: VehiclesOrder }> = orders.map(
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

      <Quiz>
        <template #trigger="{ open }">
          <UTooltip text="Тисни, щоб дізнатись яке авто підходить тобі">
            <UIcon
              name="i-heroicons-magnifying-glass-circle"
              class="cursor-pointer text-primary-400 w-6 h-6"
              @click="open"
            />
          </UTooltip>
        </template>
      </Quiz>
    </div>

    <USelectMenu
      v-model="catalogStore.order"
      placeholder="Сортувати"
      :items="options"
      variant="none"
      value-key="value"
      :search-input="false"
      :ui="{
        base: `w-full max-w-80 justify-end cursor-pointer ${
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
