<script setup lang="ts">
import Hero from "@/components/Home/Hero.vue";
import Latest from "@/components/Home/Latest.vue";
import ContactForm from "@/components/ContactForm.vue";
import Brands from "@/components/Home/Brands.vue";
import { generatePageTitle } from "@/utils/seo";

const route = useRoute();

const pageTitie = generatePageTitle("Легкий шлях до нового авто");

useHead({
  title: pageTitie,
  meta: [
    {
      name: "description",
      content: pageTitie,
    },
    {
      name: "og:title",
      content: pageTitie,
    },
    {
      name: "og:url",
      content: route.fullPath,
    },
    {
      name: "og:image",
      content: "public/images/hero-image-mobile.png",
    },
  ],
});

const { $bycarApi } = useNuxtApp();

const { data } = await useAsyncData(
  async () => {
    const [vehicles, brands] = await Promise.all([
      $bycarApi.searchVehicles({ pagination: { limit: 8 } }),
      $bycarApi.getBrands(),
    ]);

    return {
      latestItems: vehicles.items,
      totalItems: vehicles.meta.totalItems,
      establishedBrands: brands,
    };
  },
  {
    default: () => ({ latestItems: [], establishedBrands: [], totalItems: 0 }),
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);
</script>

<template>
  <main class="container pt-20 md:pt-10 lg:pt-0">
    <Hero :total-cars="data.totalItems" />
    <Latest :latest-items="data.latestItems" />
    <ContactForm page="Головна сторінка" />
    <Brands :established-brands="data.establishedBrands" />
  </main>
</template>
