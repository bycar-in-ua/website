<script setup lang="ts">
import Catalog from "@/components/Catalog/index.vue";
import { useCatalogStore } from "@/stores/catalog";
import { generatePageTitle } from "@/utils/seo";

useHead({
  title: generatePageTitle("Каталог авто"),
  meta: [
    {
      name: "description",
      content: "Каталог авто | bycar-in-ua - Автомобільна спільнота України",
    },
    {
      name: "og:title",
      content: generatePageTitle("Каталог авто"),
    },
    {
      name: "og:url",
      content: "https://bycar.in.ua/catalog",
    },
    {
      name: "og:image",
      content: "/public/images/homepage-bg.jpg",
    },
  ],
});

const catalogStore = useCatalogStore();

onUnmounted(() => {
  catalogStore.$dispose();
});

// const route = useRoute();

// await catalogStore.fetchCars();

// watch(
//   () => route.query,
//   async () => {
//     await catalogStore.fetchCars();
//   },
// );
</script>

<template>
  <main class="container lg:flex gap-4 relative pt-32 pb-5 mb-auto">
    <Catalog />
  </main>
</template>
