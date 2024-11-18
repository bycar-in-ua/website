<script setup lang="ts">
import { useCatalogStore } from "@/stores/catalog.js";
import type { VehiclesOrder } from "@bycar-in-ua/sdk";

const { t } = useI18n();

const orders: VehiclesOrder[] = ["price-asc", "price-desc", "yearFrom-desc", "yearFrom-asc"];

const options: Array<{ label: string; value: VehiclesOrder }> = orders.map((order) => ({
  label: t(`orders.${order}`),
  value: order,
}));

const catalogStore = useCatalogStore();

function handleClearOrder() {
  catalogStore.order = undefined;
}
</script>

<template>
  <div class="flex items-center gap-5">
    <h2 class="font-semibold text-3xl">
      {{ t('catalog.title') }}
    </h2>
    <div class="ml-auto">
      <USelect
        v-model:model-value="catalogStore.order"
        placeholder="Сортувати"
        variant="none"
        :options
        :ui="{ wrapper: 'w-80',
               placeholder: 'text-primary',
               color: { white: { none: 'text-primary' } },
               icon: {
                 color: 'text-black',
                 trailing: {
                   pointer: 'pointer-events-none',
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
  </div>
</template>
