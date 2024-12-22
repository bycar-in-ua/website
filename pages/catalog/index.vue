<script setup lang="ts">
import Sidebar from "@/components/Catalog/Sidebar.vue";
import List from "@/components/Catalog/List.vue";
import Headline from "@/components/Catalog/Headline.vue";
import ContactForm from "@/components/ContactForm.vue";
import BluredEllipse from "@/components/UI/BluredEllipse.vue";
import { useCatalogStore } from "@/stores/catalog";
import { generatePageTitle } from "@/utils/seo";

const route = useRoute();

const pageTitie = generatePageTitle("Каталог авто");
const pageDescription =
  "Каталог нових автомобілів від офіційних дилерів в Україні. Звертайтеся за допомогою у підборі нових авто або пишіть в чат для консультації.";

const img = useImage();

useSeoMeta({
  title: pageTitie,
  description: pageDescription,
  ogTitle: pageTitie,
  ogUrl: route.fullPath,
  ogImage: {
    url: img("/bycar-logo-light.png"),
    alt: pageTitie,
  },
  ogDescription: pageDescription,
});

const catalogStore = useCatalogStore();

await catalogStore.refresh();

onUnmounted(() => {
  catalogStore.$dispose();
});
</script>

<template>
  <main class="container pt-24 md:pt-32 pb-5 mb-auto relative">
    <BluredEllipse
      class="absolute w-[410px] h-[220px] z-0 left-0 md:left-56 top-72 md:top-60"
    />
    <Headline class="mb-6" />
    <div
      class="lg:flex gap-10 relative blured-ellipse-bg after:left-56 after:top-5"
    >
      <Sidebar />

      <List />
    </div>
    <ContactForm page="Каталог" />
  </main>
</template>
