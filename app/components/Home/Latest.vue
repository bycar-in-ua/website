<script setup lang="ts">
import SectionTitle from "~/components/UI/SectionTitle.vue";
import VehiclesCarousel from "~/components/VehiclesCarousel.vue";
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

const carousel = useTemplateRef("carousel");
</script>

<template>
  <section class="mt-10 md:mt-20 mb-8 md:mb-18">
    <SectionTitle
      :title="['Авто в наявності', 'Спеціальні пропозиції']"
      class="mb-10"
    >
      <pre>{{ availableVehicles?.items }}</pre>
      <template #extra>
        <div class="flex items-center gap-2">
          <!-- <UButton variant="outline">
            Дивитися всі
          </UButton> -->

          <UButton
            variant="outline"
            color="secondary"
            icon="i-lucide-chevron-left"
            class="ml-4"
            @click="carousel?.scrollPrev()"
          />
          <UButton
            variant="outline"
            color="secondary"
            icon="i-lucide-chevron-right"
            @click="carousel?.scrollNext()"
          />
        </div>
      </template>
    </SectionTitle>

    <VehiclesCarousel
      ref="carousel"
      :vehicles="availableVehicles?.items ?? []"
    />
  </section>
</template>
