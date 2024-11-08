<script setup lang="ts">
import { useCatalogStore } from "@/stores/catalog.js";
import type { VehiclesOrder } from "@bycar-in-ua/sdk";

const options: Array<{ label: string; value: VehiclesOrder }> = [
  { label: "За ціною: від дешевших", value: "price-asc" },
  { label: "За ціною: від дорожчих", value: "price-desc" },
  { label: "За роком: від новіших", value: "yearFrom-desc" },
  { label: "За роком: від старших", value: "yearFrom-asc" },
];

const catalogStore = useCatalogStore();
</script>

<template>
  <div class="mb-6 flex gap-5">
    <h2 class=" font-semibold text-3xl">
      Каталог авто
    </h2>
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
