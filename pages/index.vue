<script setup lang="ts">
import type { Brand, Vehicle } from "@bycar-in-ua/sdk";
import Hero from "@/components/Home/Hero.vue";
import Latest from "@/components/Home/Latest.vue";
import ContactForm from "@/components/Home/ContactForm.vue";
import Brands from "@/components/Home/Brands.vue";
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

const bycarApi = useBycarApi();

const { data } = await useAsyncData(
  async () => {
    const [vehicles, brands] = await Promise.all([
      bycarApi<{ items: Vehicle[] }>("vehicles/search", {
        method: "POST",
        body: { limit: 8 },
      }),
      bycarApi<Brand[]>("brands"),
    ]);

    return {
      latestItems: vehicles.items,
      establishedBrands: brands,
    };
  },
  { default: () => ({ latestItems: [], establishedBrands: [] }) },
);
</script>

<template>
  <main class="container pt-20 md:pt-10 lg:pt-0">
    <Hero />
    <Latest :latest-items="data.latestItems" />
    <ContactForm />
    <Brands :established-brands="data.establishedBrands" />
  </main>
</template>
