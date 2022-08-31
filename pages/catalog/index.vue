<template>
  <main class="bycar-container lg:flex gap-4 relative py-5">
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
import HomeBg from "@/assets/images/homepage-bg.jpg";

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
      content: HomeBg,
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
