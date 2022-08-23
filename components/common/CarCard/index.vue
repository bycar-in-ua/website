<template>
  <div class="car-card">
    <NuxtLink v-if="car.featureImage" :to="carRoute">
      <img
        :src="$cdnLink(car.featureImage.path, 480, 300)"
        :alt="carTitle"
        class="rounded-t-lg mb-3"
      />
    </NuxtLink>
    <NuxtLink :to="carRoute">
      <h3 class="car-card-component font-bold uppercase" v-text="carTitle" />
    </NuxtLink>
    <div class="car-card-component flex justify-end">
      <NuxtLink :to="carRoute" class="text-primary font-bold text-sm">
        {{ $t("details") }}
      </NuxtLink>
    </div>
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

const props = defineProps<{
  car: Car;
}>();

const carTitle = getCarTitle(props.car);

const carRoute = computed(() => `/${props.car.brand.slug}/${props.car.slug}`);
</script>

<style lang="postcss">
.car-card {
  @apply bg-white rounded-lg border border-gray-200;
}
.car-card-component {
  @apply px-4 md:px-5 my-4;
}
</style>
