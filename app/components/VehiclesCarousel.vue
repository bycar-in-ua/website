<script setup lang="ts">
import type { VehicleSearchDocument } from "@bycar-in-ua/vehicles-sdk";
import { CarCard, type CardType } from "~/components/UI/CarCard";

const props = withDefaults(defineProps<{
  vehicles: VehicleSearchDocument[];
  type?: CardType;
}>(), { type: "model" });

const carRequestSlideover = useCarRequestSlideover();

function openRequest(car: VehicleSearchDocument) {
  if (!car.vehicleId) return;
  carRequestSlideover.open({
    vehicleId: car.vehicleId,
    availableVehicleId: car.id,
    direct: true,
  });
}

const carousel = useTemplateRef("carousel");

const scrollable = computed(() => props.vehicles.length > 1);

defineExpose({
  scrollNext: () => carousel.value?.emblaApi?.scrollNext(),
  scrollPrev: () => carousel.value?.emblaApi?.scrollPrev(),
  scrollable,
});
</script>

<template>
  <UCarousel
    ref="carousel"
    v-slot="{ item: car }"
    dots
    loop
    align="start"
    :items="vehicles"
    :ui="{
      root: 'overflow-hidden max-sm:-me-4',
      viewport: 'overflow-visible relative z-10',
      container: 'items-stretch',
      dots: 'static pt-10 pb-4',
      item: 'basis-[calc(100%-2rem)] sm:basis-1/2 lg:basis-1/3',
    }"
  >
    <NuxtLink
      :key="car.id"
      :to="type === 'model' ? { name: 'SingleCar', params: { slug: car.slug } } : { name: 'AvailableCarSingle', params: { id: car.id } }"
      class="block h-full"
    >
      <CarCard
        :car="car"
        :is-compared="true"
        class="h-full"
      >
        <template #cta>
          <UButton v-if="type === 'available'" block @click.prevent.stop="openRequest(car)">
            Отримати пропозицію
          </UButton>
        </template>
      </CarCard>
    </NuxtLink>
  </UCarousel>
</template>
