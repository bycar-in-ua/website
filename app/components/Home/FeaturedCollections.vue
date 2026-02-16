<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";
import { useQuery } from "@tanstack/vue-query";
// Deprecated, export type from vehicles-sdk
import { BodyType } from "@bycar-in-ua/sdk";
import SectionTitle from "~/components/UI/SectionTitle.vue";
import CarCard from "../UI/CarCard/CardRoot.vue";
import type { VehicleSearchDocument } from "@bycar-in-ua/vehicles-sdk";

const vehiclesService = useVehiclesService();

const { data: vehicles, suspense } = useQuery({
  queryKey: ["homepage-vehicles-collections"],
  queryFn: async () => {
    const defaultPagination = {
      page: 1,
      limit: 12,
    };

    const [
      familyCars, hybrids, electrics, recommended,
    ] = await Promise.all([
      vehiclesService.searchVehicles({
        filters: {
          bodyType: [
            BodyType.SUV, BodyType.universal, BodyType.minivan,
          ],
          maxPrice: 60000,
          maxPower: 200,
        },
        pagination: defaultPagination,
      }),
      vehiclesService.searchVehicles({
        filters: { engineType: ["hybrid"] },
        pagination: defaultPagination,
      }),
      vehiclesService.searchVehicles({
        filters: { engineType: ["electric"] },
        pagination: defaultPagination,
      }),
      vehiclesService.searchVehicles({
        filters: {
          bodyType: [
            BodyType.sedan, BodyType.coupe, BodyType.cabriolet,
          ],
          minPower: 200,
          minPrice: 50000,
        },
        pagination: defaultPagination,
      }),
    ]);

    return {
      familyCars,
      hybrids,
      electrics,
      recommended,
    };
  },
});

await suspense();

function toCarouselChunks(vehicles: VehicleSearchDocument[]) {
  const chunkSize = 3;
  const chunks = [];

  for (let i = 0; i < vehicles.length; i += chunkSize) {
    chunks.push(vehicles.slice(i, i + chunkSize));
  }

  return chunks;
}

type VehicleAccordionItem = AccordionItem & {
  count: number;
  carouselItems: VehicleSearchDocument[][];
};

const items = computed<VehicleAccordionItem[]>(() => {
  return [
    {
      label: "Сімейне авто",
      count: vehicles.value?.familyCars.meta.totalItems ?? 0,
      carouselItems: toCarouselChunks(vehicles.value?.familyCars.items ?? []),
    },
    {
      label: "Найкращі гібриди",
      count: vehicles.value?.hybrids.meta.totalItems ?? 0,
      carouselItems: toCarouselChunks(vehicles.value?.hybrids.items ?? []),
    },
    {
      label: "Найкращі електрокари",
      count: vehicles.value?.electrics.meta.totalItems ?? 0,
      carouselItems: toCarouselChunks(vehicles.value?.electrics.items ?? []),
    },
    {
      label: "Рекомендовані авто",
      count: vehicles.value?.recommended.meta.totalItems ?? 0,
      carouselItems: toCarouselChunks(vehicles.value?.recommended.items ?? []),
    },
  ];
});
</script>

<template>
  <section class="my-10 md:my-20">
    <SectionTitle
      :title="['Всі авто', 'Підбірки найкращих моделей']"
      class="mb-10"
    />

    <UAccordion
      default-value="0"
      :items="items"
      :ui="{
        label: 'text-3xl font-semibold',
      }"
    >
      <template #trailing="{ item }">
        <UButton variant="outline" class="ml-auto">
          {{ item.count }} пропозиції
        </UButton>
      </template>

      <template #content="{ item: accordionItem }">
        <UCarousel
          v-slot="{ item: vehiclesChunk }"
          dots
          loop
          :items="accordionItem.carouselItems"
          :ui="{
            root: 'overflow-hidden pb-8',
            viewport: 'overflow-visible relative z-10',
            dots: 'static pt-10',
          }"
        >
          <div class="grid grid-cols-3 gap-4 pt-4">
            <CarCard
              v-for="car in vehiclesChunk"
              :key="car.id"
              :car="car"
              :is-compared="true"
            >
              <template #cta>
                <UButton block @click="navigateTo({ name: 'SingleCar', params: { slug: car.slug } })">
                  Дізнатися деталі
                </UButton>
              </template>
            </CarCard>
          </div>
        </UCarousel>
      </template>
    </UAccordion>
  </section>
</template>
