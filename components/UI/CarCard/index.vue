<script setup lang="ts">
import type { VehicleView as Car } from "@bycar-in-ua/common";
import { getCarTitle } from "@/utils/carHelpers";

const props = defineProps<{
  car: Car;
}>();

const placeholderImage = "/images/placeholder-image.jpg";

const carTitle = getCarTitle(props.car);
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
  >
    <UCard
      :ui="{
        header: {
          base: 'aspect-w-16 aspect-h-9',
          padding: '',
        },
        body: {
          padding: 'p-2 sm:p-4',
        },
      }"
    >
      <template #header>
        <img
          :src="
            car.featureImage
              ? $cdnLink(car.featureImage.path, 480, 300)
              : placeholderImage
          "
          :alt="carTitle"
          class="rounded-t-lg object-cover"
        />
      </template>
      <div class="flex flex-col gap-2">
        <h3 class="font-bold uppercase" v-text="carTitle" />
        <span class="text-primary font-bold text-md text-right mt-auto">
          {{ $t("details") }}
        </span>
      </div>
    </UCard>
  </NuxtLink>
</template>
