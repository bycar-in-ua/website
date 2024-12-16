<script setup lang="ts">
import type { Vehicle } from "@bycar-in-ua/sdk";
import { getVehicleInfoBullets, getPriceRange } from "./helpers.js";
import { getCarTitle } from "@/utils/carHelpers";

const props = defineProps<{
  car: Vehicle;
}>();

const { t } = useI18n();

const carTitle = getCarTitle(props.car);

const priceRange = computed(() => getPriceRange(props.car.complectations));

const infoBullets = computed(() => getVehicleInfoBullets(props.car, t));
</script>

<template>
  <NuxtLink
    :to="{
      name: 'SingleCar',
      params: {
        brand: car.brand?.slug ?? '',
        model: car.slug,
      },
    }"
    class="car-card aspect-w-9 aspect-h-9 xs:aspect-h-12 rounded-3xl shadow-xl after:absolute after:block after:inset-0 after:rounded-3xl hover:after:opacity-30 after:transition-all duration-300 overflow-hidden"
  >
    <NuxtImg
      v-if="car.featureImage?.path"
      provider="bycar"
      :src="car.featureImage.path"
      :alt="carTitle"
      height="360"
      loading="lazy"
      class="car-card-img transition-all duration-300 object-cover"
    />
    <NuxtImg v-else src="/images/placeholder-image.jpg" class="object-cover" />
    <div class="p-4 text-white absolute inset-0 flex flex-col z-10">
      <h3>{{ carTitle }}</h3>
      <div class="font-semibold">
        {{ priceRange }}
      </div>

      <div class="mt-auto flex gap-1 justify-between">
        <div
          v-for="(bullet, index) in infoBullets"
          :key="index"
          class="text-xs flex flex-col items-center gap-1 basis-18 shrink-0"
          :title="bullet.title"
        >
          <component :is="bullet.icon" class="w-6 h-6" />
          <span class="max-w-18 truncate text-ellipsis">
            {{ bullet.text }}
          </span>
        </div>
      </div>
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
