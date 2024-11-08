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
</script>

<template>
  <div class="flex items-center gap-5">
    <h2 class=" font-semibold text-3xl">
      {{ t('catalog.title') }}
    </h2>
    <UIcon
      v-if="catalogStore.pending"
      name="i-svg-spinners:180-ring"
      class="w-6 h-6 text-primary"
    />
    <div class="ml-auto">
      <USelect
        v-model:model-value="catalogStore.order"
        placeholder="Сортувати"
        variant="none"
        :options
        :ui="{ placeholder: 'text-primary', color: { white: { none: 'text-primary' } } }"
      />
    </div>
  </div>
</template>
