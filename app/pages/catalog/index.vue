<script setup lang="ts">
import PageHeader from "~/components/UI/PageHeader.vue";
import List from "~/components/Catalog/List.vue";
import Headline from "~/components/Catalog/Headline.vue";
import ContactForm from "~/components/ContactFormSection.vue";
import FiltersSlideover from "~/components/Catalog/Filters/FiltersSlideover.vue";
import { useCatalogStore } from "~/stores/catalog";

const isFiltersOpen = ref(false);

definePageMeta({ name: "catalog" });

const route = useRoute();

const catalogStore = useCatalogStore();
const { data: filtersData } = useCatalogFilters();

const brandFilterId = catalogStore.filters.brand?.at(0);

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
        ]),
      ),
    },
  ],
});

await catalogStore.refetch();

onUnmounted(() => {
  catalogStore.$dispose();
});
</script>

<template>
  <main>
    <h1 class="sr-only">
      {{ h1 }}
    </h1>

    <PageHeader
      :title="['Каталог моделей', 'Знайомтесь з моделями']"
      bg-url="/images/catalog-banner.jpg"
      :extra="`${filtersData?.total} Пропозицій`"
      class="catalog-page-header"
      :loading="catalogStore.isFetching"
    />

    <Headline
      class="mt-16 container mx-auto"
      @filter-click="isFiltersOpen = true"
    />
    <FiltersSlideover v-model:open="isFiltersOpen" />

    <div class="container mx-auto py-16">
      <List />
    </div>

    <ContactForm page="Каталог" />
  </main>
</template>

<style>
.catalog-page-header {
  background: linear-gradient(90deg, #000 26.23%, rgba(0, 0, 0, 0.00) 40.98%, rgba(0, 0, 0, 0.00) 65%, #000 94.4%);
}
</style>
