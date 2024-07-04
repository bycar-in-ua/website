<template>
  <main class="bycar-container lg:flex gap-4 relative py-5 mb-auto">
    <Catalog />
  </main>
</template>

<script lang="ts">
export default defineComponent({
  name: "CatalogPage",
});
</script>

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

const route = useRoute();

await catalogStore.fetchCars();

watch(
  () => route.query,
  async () => {
    await catalogStore.fetchCars();
  },
);
</script>
