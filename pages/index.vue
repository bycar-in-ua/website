<template>
  <main>
    <Hero />
    <Latest />
    <Brands />
  </main>
</template>

<script lang="ts">
export default defineComponent({
  name: "HomePage",
});
</script>

<script setup lang="ts">
import type { VehicleDto as Car, BrandDto as Brand } from "@bycar-in-ua/common";
import { useNuxtApp } from "#app";
import Hero from "@/components/Home/Hero.vue";
import Latest from "@/components/Home/Latest.vue";
import Brands from "@/components/Home/Brands.vue";
import { useHomeStore } from "@/stores/home";
import { generatePageTitle } from "@/utils/seo";

useHead({
  title: generatePageTitle("Просто зручний каталог авто"),
  meta: [
    {
      name: "description",
      content: generatePageTitle("Просто зручний каталог авто"),
    },
    {
      name: "og:title",
      content: generatePageTitle("Просто зручний каталог авто"),
    },
    {
      name: "og:url",
      content: useRoute().fullPath,
    },
    {
      name: "og:image",
      content: "public/homepage-bg.jpg",
    },
  ],
});

const homeStore = useHomeStore();

const { $api } = useNuxtApp();

type ResponseType = {
  recentVehicles: Car[];
  establishedBrands: Brand[];
};

const data = await $api.get<ResponseType>("/website/home");

homeStore.latestItems = data.recentVehicles || [];
homeStore.establishedBrands = data.establishedBrands || [];
</script>
