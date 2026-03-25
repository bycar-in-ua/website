<script setup lang="ts">
import type { VehicleSearchDocument } from "@bycar-in-ua/vehicles-sdk";
import { CarCard, type CardType } from "~/components/UI/CarCard";

const props = withDefaults(defineProps<{
  vehicles: VehicleSearchDocument[];
  type?: CardType;
}>(), { type: "model" });

const carouselItems = computed(() => {
  // Split items into chunks of 3 for carousel slides
  const chunkSize = 3;
  const chunks = [];

  for (let i = 0; i < props.vehicles.length; i += chunkSize) {
    chunks.push(props.vehicles.slice(i, i + chunkSize));
  }

  return chunks;
});

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

const scrollable = computed(() => carouselItems.value.length > 1);

defineExpose({
  scrollNext: () => carousel.value?.emblaApi?.scrollNext(),
  scrollPrev: () => carousel.value?.emblaApi?.scrollPrev(),
  scrollable,
});
</script>

<template>
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
      <NuxtLink
        v-for="car in item"
        :key="car.id"
        :to="type === 'model' ? { name: 'SingleCar', params: { slug: car.slug } } : { name: 'AvailableCarSingle', params: { id: car.id } }"
        class="block"
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
    </div>
  </UCarousel>
</template>
