<script setup lang="ts">
import SectionTitle from "~/components/UI/SectionTitle.vue";
import CarCard from "~/components/UI/CarCard";
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

const carouselItems = computed(() => {
  if (!availableVehicles.value || availableVehicles.value?.items.length === 0) {
    return [];
  }

  // Split items into chunks of 3 for carousel slides
  const chunkSize = 3;
  const chunks = [];

  for (let i = 0; i < availableVehicles.value.items.length; i += chunkSize) {
    chunks.push(availableVehicles.value.items.slice(i, i + chunkSize));
  }

  return chunks;
});

const handleCtaClick = (title: string) => {
  alert(`CTA clicked for car title: ${title}`);
};
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
            @click="carousel?.emblaApi?.scrollPrev()"
          />
          <UButton
            variant="outline"
            color="secondary"
            icon="i-lucide-chevron-right"
            @click="carousel?.emblaApi?.scrollNext()"
          />
        </div>
      </template>
    </SectionTitle>

    <UCarousel
      ref="carousel"
      v-slot="{ item }"
      dots
      loop
      :items="carouselItems"
      :ui="{
        root: 'overflow-hidden',
        viewport: 'overflow-visible relative z-10',
        dots: 'static pt-10 pb-4',
      }"
    >
      <div class="grid grid-cols-3 gap-4">
        <CarCard
          v-for="car in item"
          :key="car.id"
          :car="car"
          :is-compared="true"
        >
          <template #cta>
            <UButton block @click="handleCtaClick(car.title)">
              Отримати пропозицію
            </UButton>
          </template>
        </CarCard>
      </div>
    </UCarousel>
  </section>
</template>
