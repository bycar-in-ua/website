<script setup lang="ts">
import type { VehicleSearchDocument } from "@bycar-in-ua/vehicles-sdk";
import { CarCard } from "~/components/UI/CarCard";

const props = defineProps<{ vehicles: VehicleSearchDocument[]; }>();

const carouselItems = computed(() => {
  // Split items into chunks of 3 for carousel slides
  const chunkSize = 3;
  const chunks = [];

  for (let i = 0; i < props.vehicles.length; i += chunkSize) {
    chunks.push(props.vehicles.slice(i, i + chunkSize));
  }

  return chunks;
});

const handleCtaClick = (title: string) => {
  alert(`CTA clicked for car title: ${title}`);
};

const carousel = useTemplateRef("carousel");

defineExpose({
  scrollNext: () => carousel.value?.emblaApi?.scrollNext(),
  scrollPrev: () => carousel.value?.emblaApi?.scrollPrev(),
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
        :to="{ name: 'SingleCar', params: { brand: car.brand?.slug, model: car.slug } }"
        class="block"
      >
        <CarCard
          :car="car"
          :is-compared="true"
          class="h-full"
        >
          <template #cta>
            <UButton block @click.prevent="handleCtaClick(car.title)">
              Отримати пропозицію
            </UButton>
          </template>
        </CarCard>
      </NuxtLink>
    </div>
  </UCarousel>
</template>
