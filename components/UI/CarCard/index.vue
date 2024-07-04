<template>
  <div class="car-card">
    <NuxtLink :to="carRoute">
      <img
        :src="
          car.featureImage
            ? $cdnLink(car.featureImage.path, 480, 300)
            : placeholderImage
        "
        :alt="carTitle"
        class="rounded-t-lg w-full aspect-video object-cover"
      />
    </NuxtLink>
    <NuxtLink :to="carRoute">
      <h3 class="car-card-component font-bold uppercase" v-text="carTitle" />
    </NuxtLink>
    <NuxtLink
      :to="carRoute"
      class="car-card-component text-primary font-bold text-md text-right mt-auto"
    >
      Докладніше
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CarCard",
});
</script>

<script setup lang="ts">
import type { VehicleView as Car } from "@bycar-in-ua/common";
import { getCarTitle } from "@/utils/carHelpers";

const props = defineProps<{
  car: Car;
}>();

const placeholderImage = "/images/placeholder-image.jpg";

const carTitle = getCarTitle(props.car);

const carRoute = computed(
  () => `/${props.car.brand.slug ?? ""}/${props.car.slug}`,
);
</script>

<style>
.car-card {
  @apply bg-white rounded-lg border border-gray-200 flex flex-col;
}
.car-card-component {
  @apply px-4 py-2;
}
</style>
