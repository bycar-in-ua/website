<template>
  <div class="car-card">
    <NuxtLink :to="carRoute">
      <img
        :src="
          car.featureImage
            ? $cdnLink(car.featureImage.path, 480, 300)
            : carPlaceholder
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
      {{ $t("details") }}
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
import { VehicleDto as Car } from "common";
import { getCarTitle } from "@/utils/carHelpers";
import carPlaceholder from "@/assets/images/placeholder-image.jpg";

const props = defineProps<{
  car: Car;
}>();

const carTitle = getCarTitle(props.car);

const carRoute = computed(() => `/${props.car.brand.slug}/${props.car.slug}`);
</script>

<style lang="postcss">
.car-card {
  @apply bg-white rounded-lg border border-gray-200 flex flex-col;
}
.car-card-component {
  @apply px-4 py-2;
}
</style>
