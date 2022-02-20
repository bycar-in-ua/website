<template>
  <div>
    <Hero />
    <Latest />
    <Brands />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "IndexPage",
});
</script>

<script setup lang="ts">
import { useNuxtApp } from "#app";
import Hero from "@/components/Home/Hero.vue";
import Latest from "@/components/Home/Latest.vue";
import Brands from "@/components/Home/Brands.vue";
import { useHomeStore } from "@/stores/home";
import type { Car } from "@/types/car.type";
import type { Brand } from "@/types/brand.type";

const homeStore = useHomeStore();

const { $api } = useNuxtApp();

const [{ data: vehicles }, { data: brands }] = await Promise.all([
  $api.get<{ items: Car[] }>("/vehicles?limit=8"),
  $api.get<Brand[]>("/brands"),
]);

homeStore.latestItems = vehicles.value.items;
homeStore.establishedBrands = brands.value;
</script>
