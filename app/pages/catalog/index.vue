<script setup lang="ts">
import PageHeader from "~/components/Catalog/PageHeader.vue";
import List from "~/components/Catalog/List.vue";
import Headline from "~/components/Catalog/Headline.vue";
import ContactForm from "~/components/ContactFormSection.vue";
import FiltersSlideover from "~/components/Catalog/Filters/FiltersSlideover.vue";
import { useCatalogStore } from "~/stores/catalog";
import PartnershipBanner from "~/components/PartnershipBanner.vue";

const isFiltersOpen = ref(false);

definePageMeta({ name: "catalog" });

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
          {
            name: String(seoInput.title),
            path: route.fullPath,
          },
        ])
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
  <main>
    <!-- SEO-only H1 -->
    <h1 class="sr-only">
      {{ h1 }}
    </h1>

    <PageHeader />

    <Headline
      class="mt-16 container mx-auto"
      @filter-click="isFiltersOpen = true"
    />
    <FiltersSlideover v-model:open="isFiltersOpen" />

    <!-- Main Content: Sidebar + Grid -->
    <div class="container mx-auto py-16">
      <List />
    </div>

    <!-- Bottom: Contact Form Section -->
    <ContactForm page="Каталог" />
  </main>
</template>
