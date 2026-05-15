<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useVehiclesService } from "~/composables/useVehiclesService";
import PageHeader from "~/components/UI/PageHeader.vue";
import Headline from "~/components/AvailableCatalog/Headline.vue";
import CarCard from "~/components/UI/CarCard";

definePageMeta({ name: "available-catalog" });

const vehiclesService = useVehiclesService();

const { data: vehicles } = useQuery({
  queryKey: ["search-available-vehicles"],
  queryFn: () => vehiclesService.searchAvailableVehicles({ filters: {} }),
});
</script>

<template>
  <main>
    <PageHeader
      :title="['Авто в наявності', 'Обирай авто для себе']"
      bg-url="/images/available-catalog-header-bg.jpg"
      :extra="vehicles?.meta.totalItems ? `${vehicles?.meta.totalItems} Пропозицій` : ''"
      class="available-catalog-page-header"
    />

    <div class="container mx-auto py-8 sm:py-12 md:py-16 relative">
      <Headline class="mb-6 sm:mb-8" />

      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        <CarCard v-for="vehicle in vehicles?.items" :key="vehicle.id" :car="vehicle" />
      </div>
    </div>
  </main>
</template>

<style>
.available-catalog-page-header {
    background-position: bottom center;
}
</style>
