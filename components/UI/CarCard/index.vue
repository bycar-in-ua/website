<script setup lang="ts">
import type { VehicleView as Car } from "@bycar-in-ua/common";
import { getCarTitle } from "@/utils/carHelpers";

const props = defineProps<{
  car: Car;
}>();

const { $cdnLink } = useNuxtApp();

const carTitle = getCarTitle(props.car);
const imageUrl = props.car.featureImage
  ? $cdnLink(props.car.featureImage.path, 320, 400)
  : "/images/placeholder-image.jpg";
const priceRange = computed(() => {
  if (!props.car.complectations?.length) {
    return "";
  }

  const prices = props.car.complectations
    .flatMap((complectation) => Object.values(complectation.priceRange))
    .filter(Boolean) as number[];

  if (prices.length === 1) {
    return `$${prices[0]}`;
  }

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return `$${min} - $${max}`;
});
</script>

<template>
  <NuxtLink
    :to="{
      name: 'SingleCar',
      params: {
        brand: car.brand.slug,
        model: car.slug,
      },
    }"
    class="car-card aspect-w-9 aspect-h-12 rounded-3xl shadow-xl after:absolute after:block after:inset-0 after:rounded-3xl hover:after:opacity-30 after:transition-all duration-300 overflow-hidden"
  >
    <img
      :src="imageUrl"
      class="car-card-img transition-all duration-300 object-cover rounded-3xl"
      :alt="carTitle"
    />
    <div class="p-4 text-white absolute inset-0 z-10">
      <h3>{{ carTitle }}</h3>
      <div class="font-bold">{{ priceRange }}</div>
    </div>
  </NuxtLink>
</template>

<style>
.car-card:after {
  background-image: linear-gradient(
    0deg,
    rgba(40, 40, 40, 0.7) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(40, 40, 40, 0.7) 100%
  );
}

.car-card:hover .car-card-img {
  transform: scale(1.25);
}
</style>
