<script setup lang="ts">
import Hero from "@/components/Home/Hero.vue";
import Latest from "@/components/Home/Latest.vue";
import ContactForm from "@/components/Home/ContactForm.vue";
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

const { data } = await useFetch("/api/home");

homeStore.latestItems = data.value?.recentVehicles || [];
homeStore.establishedBrands = data.value?.establishedBrands || [];
</script>

<template>
  <main class="container">
    <Hero />
    <Latest />
    <ContactForm />
    <Brands />
  </main>
</template>
