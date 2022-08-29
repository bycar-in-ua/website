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
import HomeBg from "@/assets/images/homepage-bg.jpg";

useHead({
  title: "bycar.in.ua",
  meta: [
    {
      name: "description",
      content: "bycar-in-ua - Автомобільна спільнота України",
    },
    {
      name: "og:title",
      content: "bycar.in.ua",
    },
    {
      name: "og:url",
      content: "https://bycar.in.ua",
    },
    {
      name: "og:image",
      content: HomeBg,
    },
  ],
});

const homeStore = useHomeStore();

const { $api } = useNuxtApp();

const [{ data: vehicles }, { data: brands }] = await Promise.all([
  $api.get<{ items: Car[] }>("/vehicles?limit=8"),
  $api.get<Brand[]>("/brands"),
]);

homeStore.latestItems = vehicles.value?.items;
homeStore.establishedBrands = brands.value;
</script>
