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
import { useNuxtApp } from "#app";
import Hero from "@/components/Home/Hero.vue";
import Latest from "@/components/Home/Latest.vue";
import Brands from "@/components/Home/Brands.vue";
import { useHomeStore } from "@/stores/home";
import { VehicleDto as Car, BrandDto as Brand } from "@/common";
import { generatePageTitle } from "@/utils/seo";
import HomeBg from "@/assets/images/homepage-bg.jpg";

useHead({
  title: generatePageTitle("Автомобільна спільнота України"),
  meta: [
    {
      name: "description",
      content: generatePageTitle("Автомобільна спільнота України"),
    },
    {
      name: "og:title",
      content: generatePageTitle("Автомобільна спільнота України"),
    },
    {
      name: "og:url",
      content: useRoute().fullPath,
    },
    {
      name: "og:image",
      content: HomeBg,
    },
  ],
});

const homeStore = useHomeStore();

const { $api } = useNuxtApp();

interface ResponseType {
  recentVehicles: Car[];
  establishedBrands: Brand[];
}

const { data } = await $api.get<ResponseType>("/website/home");

homeStore.latestItems = data.value.recentVehicles || [];
homeStore.establishedBrands = data.value.establishedBrands || [];
</script>
