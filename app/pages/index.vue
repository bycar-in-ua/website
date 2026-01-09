<script setup lang="ts">
import type { HomepageData } from "#shared/types";
import ContactForm from "~/components/ContactFormSection.vue";
import Hero from "~/components/Home/Hero.vue";
import HowItWorks from "~/components/Home/HowItWorks.vue";
import FeaturedCollections from "~/components/Home/FeaturedCollections.vue";
// import LatestVideos from "~/components/Home/LatestVideos.vue";
import Latest from "~/components/Home/Latest.vue";
import Brands from "~/components/Home/Brands.vue";
import { generatePageTitle } from "~/utils/seo";

const route = useRoute();

const pageTitie = generatePageTitle("Легкий шлях до нового авто");
const pageDescription
  = "Каталог нових автомобілів від офіційних дилерів в Україні. Звертайтеся за допомогою у підборі нових авто або пишіть в чат для консультації.";

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
  <main class="overflow-x-hidden lg:overflow-x-visible">
    <Hero :total-cars="data.totalItems" />
    <Brands :established-brands="data.establishedBrands" />
    <!-- <LatestVideos :videos="data.latestYoutubeVideos" class="container" /> -->
    <Latest :latest-items="data.latestItems" class="container" />
    <HowItWorks />
    <FeaturedCollections class="container" />
    <ContactForm page="Головна сторінка" :show-affix="false" />
    <PartnershipBanner />
  </main>
</template>
