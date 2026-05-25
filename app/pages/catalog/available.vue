<script setup lang="ts">
import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import type { SearchAvailableVehiclesInput } from "@bycar-in-ua/vehicles-sdk";
import { useVehiclesService } from "~/composables/useVehiclesService";
import { useAvailableCatalogFiltersProvider } from "~/composables/useAvailableCatalogFiltersProvider";
import { useQueryStringSort } from "~/composables/useQueryStringSort";
import PageHeader from "~/components/UI/PageHeader.vue";
import EmptyState from "~/components/Catalog/EmptyState.vue";
import Headline from "~/components/Catalog/Headline.vue";
import FiltersSlideover from "~/components/Catalog/Filters/FiltersSlideover.vue";
import CarCard from "~/components/UI/CarCard";
import Pagination from "~/components/UI/Pagination.vue";
import ContactForm from "~/components/ContactFormSection.vue";

definePageMeta({ name: "available-catalog" });

const {
  appliedFilters, appliedFiltersCount, pagination,
} = useAvailableCatalogFiltersProvider();

const vehiclesService = useVehiclesService();

const sort = useQueryStringSort();

const searchInput = computed<SearchAvailableVehiclesInput>(() => ({
  filters: appliedFilters.value,
  pagination: pagination.value,
  sort: { field: sort.value },
} as SearchAvailableVehiclesInput));

const {
  data: vehicles, suspense, isFetching,
} = useQuery({
  queryKey: ["search-available-vehicles", searchInput],
  queryFn: () => vehiclesService.searchAvailableVehicles(searchInput.value),
  placeholderData: keepPreviousData,
});

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

    <div class="container mx-auto py-8 sm:py-12 md:py-16 relative">
      <Headline
        class="mb-6 sm:mb-8"
        :applied-filters-count="appliedFiltersCount"
        @filter-click="isFiltersOpen = true"
      />

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
          <CarCard :car="vehicle" />
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
