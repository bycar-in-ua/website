<script setup lang="ts">
import type { Vehicle } from "@bycar-in-ua/sdk";
import { getVehicleInfoBullets, getPriceRange } from "./helpers.js";
import { getCarTitle } from "@/utils/carHelpers";

const props = defineProps<{
  car: Vehicle;
  title?: string;
  discount?: boolean;
}>();

const { t } = useI18n();

const carTitle = computed(() => props.title ?? getCarTitle(props.car));

const priceRange = computed(() => getPriceRange(props.car.complectations));

const infoBullets = computed(() => getVehicleInfoBullets(props.car, t));
</script>

<template>
  <div
    class="car-card aspect-w-9 aspect-h-9 xs:aspect-h-10 rounded-3xl shadow-xl after:absolute after:block after:inset-0 after:rounded-3xl hover:after:opacity-30 after:transition-all duration-300 overflow-hidden"
  >
    <CdnImage
      v-if="car.featureImage?.path"
      :src="car.featureImage.path"
      :alt="carTitle"
      size="small"
      :densities="['small:1x', 'medium:2x']"
      loading="lazy"
      class="car-card-img transition-all duration-300 object-cover"
    />
    <img v-else src="/images/placeholder-image.jpg" class="object-cover" />

    <div class="p-4 text-white absolute inset-0 flex flex-col z-10" :class="discount ? 'pt-8' : ''">
      <div v-if="discount" class="bg-red-500 text-white font-bold text-center text-xs px-2 py-1 absolute top-0 right-0 left-0 flex items-center justify-center gap-1">
        <UIcon name="i-heroicons-solid-currency-dollar" class="w-4 h-4" />
        Доступна спецпропозиція
      </div>

      <h3>
        {{ carTitle }}
      </h3>
      <div class="font-semibold">
        <slot name="price">
          {{ priceRange }}
        </slot>
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
  </div>
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
