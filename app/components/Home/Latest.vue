<script setup lang="ts">
import VehiclesCarouselSection from "~/components/VehiclesCarouselSection.vue";
import { useQuery } from "@tanstack/vue-query";

const vehiclesService = useVehiclesService();

const { data: availableVehicles, suspense } = useQuery({
  queryKey: ["homepage-available-vehicles"],
  queryFn: () => vehiclesService.searchAvailableVehicles({
    filters: {},
    pagination: {
      page: 1,
      limit: 9,
    },
  }),
});

await suspense();
</script>

<template>
  <VehiclesCarouselSection
    :title="['Авто в наявності', 'Спеціальні пропозиції']"
    :vehicles="availableVehicles?.items || []"
    class="container mt-10 md:mt-20 mb-8 md:mb-18"
  />
</template>
