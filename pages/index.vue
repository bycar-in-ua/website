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
import { useRuntimeConfig, useNuxtApp } from "#app";
import Hero from "@/components/Home/Hero.vue";
import Latest from "@/components/Home/Latest.vue";
import Brands from "@/components/Home/Brands.vue";
import { useHomeStore } from "@/stores/home";
import { Car } from "@/types/car.type";

const config = useRuntimeConfig();

const homeStore = useHomeStore();

const { $api } = useNuxtApp();

type Resp = {
  items: Car[];
  meta: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

const { data } = await $api.get<Resp>("/vehicles?limit=8");

homeStore.latestItems = data.value.items;
</script>
