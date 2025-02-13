<script setup lang="ts">
import Hero from "@/components/Home/Hero.vue";
import LatestVideos from "@/components/Home/LatestVideos.vue";
import Latest from "@/components/Home/Latest.vue";
import ContactForm from "~/components/ContactFormSection.vue";
import Brands from "@/components/Home/Brands.vue";
import { generatePageTitle } from "@/utils/seo";

const route = useRoute();

const pageTitie = generatePageTitle("Легкий шлях до нового авто");
const pageDescription =
  "Каталог нових автомобілів від офіційних дилерів в Україні. Звертайтеся за допомогою у підборі нових авто або пишіть в чат для консультації.";

useSeoMeta({
  title: pageTitie,
  description: pageDescription,
  ogTitle: pageTitie,
  ogUrl: route.fullPath,
  ogImage: {
    url: "/bycar-logo-light.png",
    alt: pageTitie,
  },
  ogDescription: pageDescription,
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
    <LatestVideos />
    <Latest :latest-items="data.latestItems" />
    <ContactForm page="Головна сторінка" :show-affix="false" />
    <Brands :established-brands="data.establishedBrands" />
  </main>
</template>
