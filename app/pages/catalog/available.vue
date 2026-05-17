<script setup lang="ts">
import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import type { SearchAvailableVehiclesInput } from "@bycar-in-ua/vehicles-sdk";
import { useAvailableCatalogFiltersStore } from "~/stores/available-catalog-filters.store";
import { useVehiclesService } from "~/composables/useVehiclesService";
import { useQueryStringSort } from "~/composables/useQueryStringSort";
import PageHeader from "~/components/UI/PageHeader.vue";
import Headline from "~/components/Catalog/Headline.vue";
import CarCard from "~/components/UI/CarCard";
import Pagination from "~/components/UI/Pagination.vue";

definePageMeta({ name: "available-catalog" });

const filtersStore = useAvailableCatalogFiltersStore();

const vehiclesService = useVehiclesService();

const sort = useQueryStringSort();

const searchInput = computed<SearchAvailableVehiclesInput>(() => ({
  filters: filtersStore.appliedFilters,
  pagination: filtersStore.pagination,
  sort: { field: sort.value },
}));

const {
  data: vehicles, suspense, isFetching,
} = useQuery({
  queryKey: ["search-available-vehicles", searchInput],
  queryFn: () => vehiclesService.searchAvailableVehicles(searchInput.value),
  placeholderData: keepPreviousData,
});

await suspense();

const list = useTemplateRef<HTMLDivElement>("list");
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
      <Headline :applied-filters-count="filtersStore.appliedFiltersCount" class="mb-6 sm:mb-8" />

      <div
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
        :page="filtersStore.pagination.page"
        :pagination="vehicles?.meta"
        @update:page="
          (page) => {
            filtersStore.pagination = { page };
            list?.scrollIntoView();
          }
        "
      />
    </div>
  </main>
</template>
