<script setup lang="ts">
import type { SearchVehiclesInput } from "@bycar-in-ua/vehicles-sdk";
import PageHeader from "~/components/UI/PageHeader.vue";
import { CarCard } from "~/components/UI/CarCard";
import Headline from "~/components/Catalog/Headline.vue";
import ContactForm from "~/components/ContactFormSection.vue";
import EmptyState from "~/components/Catalog/EmptyState.vue";
import FiltersSlideover from "~/components/Catalog/Filters/FiltersSlideover.vue";
import Pagination from "~/components/UI/Pagination.vue";
import { useModelsCatalogFiltersStore } from "~/stores/models-catalog-filters.store";
import { useVehiclesSearch } from "~/composables/useVehiclesSearch";

definePageMeta({ name: "catalog" });

const filtersStore = useModelsCatalogFiltersStore();

onUnmounted(() => {
  filtersStore.$dispose();
});

const searchInput = computed<SearchVehiclesInput>(() => ({
  filters: filtersStore.appliedFilters,
  pagination: filtersStore.pagination,
  sort: filtersStore.sort,
}));

const {
  data: vehiclesData, isFetching, suspense,
} = useVehiclesSearch(searchInput);

if (import.meta.server) {
  await suspense();
}

const brandFilterId = filtersStore.appliedFilters.brand?.at(0);

const { h1, ...seoInput } = await useCatalogSeo(brandFilterId);

useSeoMeta(seoInput);

const route = useRoute();

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

const isFiltersOpen = ref(false);

const list = useTemplateRef<HTMLDivElement>("list");
</script>

<template>
  <main>
    <h1 class="sr-only">
      {{ h1 }}
    </h1>

    <PageHeader
      :title="['Каталог моделей', 'Знайомтесь з моделями']"
      bg-url="/images/catalog-banner.jpg"
      :extra="`${filtersStore.data?.total} Пропозицій`"
      class="catalog-page-header"
      :loading="isFetching"
    />

    <Headline
      class="mt-16 container mx-auto"
      @filter-click="isFiltersOpen = true"
    />
    <FiltersSlideover v-model:open="isFiltersOpen" />

    <EmptyState v-if="!vehiclesData?.items.length" />

    <div class="container mx-auto py-16" data-testid="cars-catalog">
      <div
        ref="list"
        data-testid="cars-catalog-grid"
        class="grid xs:grid-cols-2 sm:grid-cols-3 gap-5"
        :class="{ 'blur-sm': isFetching }"
      >
        <NuxtLink
          v-for="car in vehiclesData?.items || []"
          :key="car.id"
          data-testid="catalog-car"
          :to="{
            name: 'SingleCar',
            params: {
              slug: car.slug,
            },
          }"
        >
          <CarCard :car="car">
            <template #cta>
              <UButton block @click="navigateTo({ name: 'SingleCar', params: { slug: car.slug } })">
                Дізнатися деталі
              </UButton>
            </template>

          </CarCard>
        </NuxtLink>
      </div>

      <Pagination
        class="mt-10 flex justify-center"
        :page="filtersStore.pagination.page"
        :pagination="vehiclesData?.meta"
        @update:page="
          (page) => {
            filtersStore.pagination = { page };
            list?.scrollIntoView();
          }
        "
      />
    </div>

    <ContactForm page="Каталог" />
  </main>
</template>

<style>
.catalog-page-header {
  background: linear-gradient(90deg, #000 26.23%, rgba(0, 0, 0, 0.00) 40.98%, rgba(0, 0, 0, 0.00) 65%, #000 94.4%);
}
</style>
