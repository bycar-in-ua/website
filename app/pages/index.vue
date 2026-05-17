<script setup lang="ts">
import { useModelsCatalogFilters } from "~/composables/useModelsCatalogFilters";
import ContactForm from "~/components/ContactFormSection.vue";
import { Hero } from "~/components/Home/Hero";
import HowItWorks from "~/components/Home/HowItWorks.vue";
import FeaturedCollections from "~/components/Home/FeaturedCollections.vue";
import LatestVideos from "~/components/Home/LatestVideos.vue";
import Latest from "~/components/Home/Latest.vue";
import Brands from "~/components/Home/Brands.vue";
import DualPanel from "~/components/Home/DualPanel.vue";
import BodyTypes from "~/components/Home/BodyTypes.vue";
import AboutUs from "~/components/Home/AboutUs.vue";
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

const { data: filtersData } = useModelsCatalogFilters();
</script>

<template>
  <main class="overflow-x-hidden lg:overflow-x-visible">
    <Hero :total-cars="filtersData?.total" />
    <Brands :established-brands="filtersData?.filters.brand ?? {}" />
    <Latest />
    <HowItWorks />
    <FeaturedCollections class="container" />
    <DualPanel />
    <BodyTypes class="container" />
    <LatestVideos />
    <AboutUs class="container" />
    <ContactForm page="Головна сторінка" />
    <!-- <PartnershipBanner /> -->
  </main>
</template>
