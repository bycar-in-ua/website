<script setup lang="ts">
import Hero from "@/components/Home/Hero.vue";
import LatestVideos from "@/components/Home/LatestVideos.vue";
import Latest from "@/components/Home/Latest.vue";
import ContactForm from "~/components/ContactFormSection.vue";
import Brands from "@/components/Home/Brands.vue";
import { generatePageTitle } from "@/utils/seo";
import type { HomepageData } from "@/server/api/homepage-data.get";

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

const { data } = await useFetch<HomepageData>("/api/homepage-data", {
  default: () => ({
    latestYoutubeVideos: [],
    latestItems: {
      title: "",
      queryString: "",
      items: [],
    },
    totalItems: 0,
    establishedBrands: [],
  }),

});
</script>

<template>
  <main
    class="container pt-20 md:pt-10 lg:pt-0 overflow-x-hidden lg:overflow-x-visible"
  >
    <Hero :total-cars="data.totalItems" />
    <LatestVideos :videos="data.latestYoutubeVideos" />
    <Latest v-bind="data.latestItems" />
    <ContactForm page="Головна сторінка" :show-affix="false" />
    <Brands :established-brands="data.establishedBrands" />
  </main>
</template>
