<script setup lang="ts">
import type { SearchAvailableVehiclesInput } from "@bycar-in-ua/vehicles-sdk";
import { useAvailableVehiclesSearch } from "~/composables/useAvailableVehiclesSearch";
import { useAvailableCatalogFiltersProvider } from "~/composables/useAvailableCatalogFiltersProvider";
import { useQueryStringSort } from "~/composables/useQueryStringSort";
import PageHeader from "~/components/UI/PageHeader.vue";
import HeadlineStickyContainer from "~/components/Catalog/HeadlineStickyContainer.vue";
import EmptyState from "~/components/Catalog/EmptyState.vue";
import FiltersButton from "~/components/Catalog/FiltersButton.vue";
import SortDropdown from "~/components/Catalog/SortDropdown.vue";
import FiltersSlideover from "~/components/Catalog/Filters/FiltersSlideover.vue";
import CarCard from "~/components/UI/CarCard";
import Pagination from "~/components/UI/Pagination.vue";
import ContactForm from "~/components/ContactFormSection.vue";

definePageMeta({ name: "available-catalog" });

const {
  appliedFilters, appliedFiltersCount, pagination,
} = useAvailableCatalogFiltersProvider();

const sort = useQueryStringSort();

const searchInput = computed<SearchAvailableVehiclesInput>(() => ({
  filters: appliedFilters.value,
  pagination: pagination.value,
  sort: { field: sort.value },
} as SearchAvailableVehiclesInput));

const {
  data: vehicles, suspense, isFetching,
} = useAvailableVehiclesSearch(searchInput);

await suspense();

const list = useTemplateRef<HTMLDivElement>("list");

const isFiltersOpen = ref(false);
</script>

<template>
  <main>
    <PageHeader
      :title="['Авто в наявності', 'Обирай авто для себе']"
      bg-url="/images/available-catalog-header-bg.jpg"
      bg-class="object-bottom"
      :loading="isFetching"
      :extra="vehicles?.meta.totalItems ? `${vehicles?.meta.totalItems} Пропозицій` : ''"
    />

    <div class="container mx-auto pb-8 pt-4 sm:pb-12 sm:pt-8 md:pb-16 md:pt-12 relative">
      <HeadlineStickyContainer
        class="flex items-center sm:justify-between sm:gap-4 flex-nowrap"
      >
        <FiltersButton
          :applied-filters-count="appliedFiltersCount"
          class="max-sm:shrink-0 max-sm:basis-1/2"
          @click="() => { isFiltersOpen = true }"
        />

        <SortDropdown class="max-sm:shrink-0 max-sm:basis-1/2" />
      </HeadlineStickyContainer>

      <FiltersSlideover v-model:open="isFiltersOpen" />

      <EmptyState
        v-if="!vehicles?.items?.length"
        description="Спробуйте змінити фільтри пошуку або перейдіть в каталог моделей — можливо, потрібна модель зараз не в наявності"
      >
        <template #extra>
          <UButton label="Перейти до каталогу моделей" :to="{ name: 'catalog' }" />
        </template>
      </EmptyState>

      <div
        v-else
        ref="list"
        data-testid="available-catalog-grid"
        class="grid xs:grid-cols-2 sm:grid-cols-3 gap-5"
        :class="{ 'blur-sm': isFetching }"
      >
        <NuxtLink
          v-for="vehicle in vehicles?.items"
          :key="vehicle.id"
          data-testid="catalog-car"
          :to="{
            name: 'AvailableCarSingle',
            params: {
              id: vehicle.id,
            },
          }"
        >
          <CarCard :car="vehicle" card-type="available" />
        </NuxtLink>
      </div>

      <Pagination
        class="mt-10 flex justify-center"
        :page="pagination.page"
        :pagination="vehicles?.meta"
        @update:page="
          (page) => {
            pagination = { page };
            list?.scrollIntoView();
          }
        "
      />
    </div>

    <ContactForm page="Каталог в наявності" />
  </main>
</template>
