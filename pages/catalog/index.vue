<template>
  <Catalog />
</template>

<script lang="ts">
export default {
  name: "CatalogPage",
};
</script>

<script setup lang="ts">
import Catalog from "@/components/Catalog/index.vue";
import { useCatalogStore } from "@/stores/catalog";
import { VehicleDto as Car } from "@/common";

const catalogStore = useCatalogStore();

const { $api } = useNuxtApp();

const { data: vehicles } = await $api.get<{ items: Car[] }>(
  "/vehicles?limit=10",
);

catalogStore.items = vehicles.value?.items;
</script>
