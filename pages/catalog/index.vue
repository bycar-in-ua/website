<script setup lang="ts">
import Sidebar from "@/components/Catalog/Sidebar.vue";
import List from "@/components/Catalog/List.vue";
import Headline from "@/components/Catalog/Headline.vue";
import ContactForm from "~/components/ContactFormSection.vue";
import BluredEllipse from "@/components/UI/BluredEllipse.vue";
import { useCatalogStore } from "@/stores/catalog";

definePageMeta({
  name: "catalog",
});

const route = useRoute();

const catalogStore = useCatalogStore();

const brandFilterId = catalogStore.appliedFilters
  .filter((filter) => filter.key === "brand")
  .at(0)?.value;

const { h1, ...seoInput } = await useCatalogSeo(brandFilterId);

useSeoMeta(seoInput);

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(
        generateBreadcrumbsJsonLd([
          { name: String(seoInput.title), path: route.fullPath },
        ]),
      ),
    },
  ],
});

await catalogStore.refresh();

onUnmounted(() => {
  catalogStore.$dispose();
});
</script>

<template>
  <main class="container pt-24 md:pt-32 pb-5 mb-auto relative">
    <h1 class="sr-only">
      {{ h1 }}
    </h1>
    <BluredEllipse
      class="absolute w-[410px] h-[220px] z-0 left-0 md:left-56 top-72 md:top-60"
    />
    <Headline class="mb-6" />
    <div class="lg:flex gap-10 relative blured-ellipse-bg">
      <Sidebar />

      <List />
    </div>
    <ContactForm page="Каталог" />
  </main>
</template>
