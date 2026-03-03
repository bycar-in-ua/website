<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";
import { useQuery } from "@tanstack/vue-query";
// Deprecated, export type from vehicles-sdk
import { BodyType } from "@bycar-in-ua/sdk";
import SectionTitle from "~/components/UI/SectionTitle.vue";
import VehiclesCarousel from "~/components/VehiclesCarousel.vue";
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
          minPrice: 40000,
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

type VehicleAccordionItem = AccordionItem & {
  count: number;
  carouselItems: VehicleSearchDocument[];
};

const items = computed<VehicleAccordionItem[]>(() => {
  return [
    {
      label: "Сімейне авто",
      count: vehicles.value?.familyCars.meta.totalItems ?? 0,
      carouselItems: vehicles.value?.familyCars.items || [],
    },
    {
      label: "Найкращі гібриди",
      count: vehicles.value?.hybrids.meta.totalItems ?? 0,
      carouselItems: vehicles.value?.hybrids.items || [],
    },
    {
      label: "Найкращі електрокари",
      count: vehicles.value?.electrics.meta.totalItems ?? 0,
      carouselItems: vehicles.value?.electrics.items || [],
    },
    {
      label: "Рекомендовані авто",
      count: vehicles.value?.recommended.meta.totalItems ?? 0,
      carouselItems: vehicles.value?.recommended.items || [],
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
        <VehiclesCarousel :vehicles="accordionItem.carouselItems" />
      </template>
    </UAccordion>
  </section>
</template>
