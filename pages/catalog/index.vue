<script setup lang="ts">
import Sidebar from "@/components/Catalog/Sidebar.vue";
import List from "@/components/Catalog/List.vue";
import Headline from "@/components/Catalog/Headline.vue";
import AppliedFilters from "@/components/Catalog/AppliedFilters.vue";
import ContactForm from "@/components/ContactForm.vue";
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
</script>

<template>
  <main class="container pt-32 pb-5 mb-auto">
    <Headline class="mb-6" />
    <AppliedFilters class="mb-6" />
    <div class="lg:flex gap-10 relative blured-ellipse-bg after:left-56 after:top-5">
      <Sidebar />
      <List />
    </div>
    <ContactForm />
  </main>
</template>
