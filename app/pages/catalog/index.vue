<script setup lang="ts">
import type { SearchVehiclesInput } from "@bycar-in-ua/vehicles-sdk";
import { useQueryStringSort } from "~/composables/useQueryStringSort";
import PageHeader from "~/components/UI/PageHeader.vue";
import { CarCard } from "~/components/UI/CarCard";
import Headline from "~/components/Catalog/Headline.vue";
import ContactForm from "~/components/ContactFormSection.vue";
import EmptyState from "~/components/Catalog/EmptyState.vue";
import FiltersSlideover from "~/components/Catalog/Filters/FiltersSlideover.vue";
import Pagination from "~/components/UI/Pagination.vue";
import { useModelsCatalogFiltersProvider } from "~/composables/useModelsCatalogFiltersProvider";
import { useVehiclesSearch } from "~/composables/useVehiclesSearch";

definePageMeta({ name: "catalog" });

const {
  data: filtersData,
  selectedFilters,
  removeSelectedFilter,
  appliedFilters,
  appliedFiltersCount,
  pagination,
  applyFilters,
} = useModelsCatalogFiltersProvider();

const sort = useQueryStringSort();

const searchInput = computed<SearchVehiclesInput>(() => ({
  filters: appliedFilters.value,
  pagination: pagination.value,
  sort: { field: sort.value },
} as SearchVehiclesInput));

const {
  data: vehiclesData, isFetching, suspense,
} = useVehiclesSearch(searchInput);

await suspense();

const brandFilterId = appliedFilters.value.brand?.at(0);

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

const { t } = useI18n();

const quickFilters = computed(() => filtersData.value?.filters?.bodyType?.filter((filter) => filter.count > 0) || []);

const toggleQuickFilter = (value: string) => {
  if (selectedFilters.value.bodyType?.includes(value)) {
    removeSelectedFilter("bodyType", value);
  } else {
    selectedFilters.value.bodyType = [...(selectedFilters.value.bodyType || []), value];
  }

  applyFilters();
};
</script>

<template>
  <main>
    <h1 class="sr-only">
      {{ h1 }}
    </h1>

    <PageHeader
      :title="['Каталог моделей', 'Знайомтесь з моделями']"
      bg-url="/images/catalog-banner.jpg"
      :extra="`${vehiclesData?.meta.totalItems} Пропозицій`"
      class="catalog-page-header"
      :loading="isFetching"
    />

    <Headline
      class="mt-16 container mx-auto"
      :applied-filters-count="appliedFiltersCount"
      @filter-click="isFiltersOpen = true"
    >
      <div class="flex gap-1.5 items-center overflow-x-auto max-w-full grow no-scrollbar">
        <UButton
          v-for="item in quickFilters"
          :key="item.value"
          :label="`${t(`vehicle.bodyTypes.items.${item.value}`)} (${item.count})`"
          :color="selectedFilters.bodyType?.includes(item.value) ? 'primary' : 'secondary'"
          variant="outline"
          class="capitalize"
          @click="toggleQuickFilter(item.value)"
        />
      </div>
    </Headline>

    <FiltersSlideover v-model:open="isFiltersOpen" />

    <EmptyState v-if="!vehiclesData?.items.length" description="Спробуйте змінити фільтри пошуку" />

    <div v-else class="container mx-auto py-16" data-testid="cars-catalog">
      <div
        ref="list"
        data-testid="models-catalog-grid"
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
        :page="pagination.page"
        :pagination="vehiclesData?.meta"
        @update:page="
          (page) => {
            pagination = { page };
            list?.scrollIntoView();
          }
        "
      />
    </div>

    <ContactForm page="Каталог моделей" />
  </main>
</template>

<style>
.catalog-page-header {
  background: linear-gradient(90deg, #000 26.23%, rgba(0, 0, 0, 0.00) 40.98%, rgba(0, 0, 0, 0.00) 65%, #000 94.4%);
}
</style>
