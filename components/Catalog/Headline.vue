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
    class="flex md:items-center md:justify-between gap-5 flex-col md:flex-row flex-wrap"
  >
    <div class="flex gap-4 items-center">
      <h2 class="font-semibold text-2xl md:text-3xl">
        {{ t("catalog.title") }}
      </h2>

      <Quiz>
        <template #trigger="{ open }">
          <UTooltip
            text="Тисни, щоб дізнатись яке авто підходить тобі"
            :ui="{
              width: 'max-w-xs w-fit',
              base: 'h-fit p-2 text-md text-wrap text-center',
            }"
          >
            <UIcon
              name="i-heroicons-magnifying-glass-circle"
              class="cursor-pointer text-primary-400 w-6 h-6"
              @click="open"
            />
          </UTooltip>
        </template>
      </Quiz>
    </div>

    <AppliedFilters class="md:order-3 basis-full" />

    <USelect
      v-model:model-value="catalogStore.order"
      placeholder="Сортувати"
      variant="none"
      :options
      :ui="{
        wrapper: 'max-w-80',
        base: 'truncate text-ellipsis',
        placeholder: 'text-primary',
        color: { white: { none: 'text-primary bg-transparent' } },
        icon: {
          color: 'text-black',
          trailing: {
            pointer: 'pointer-events-none',
          },
        },
        trailing: {
          padding: {
            sm: 'pe-12',
          },
        },
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
    </USelect>
  </div>
</template>
