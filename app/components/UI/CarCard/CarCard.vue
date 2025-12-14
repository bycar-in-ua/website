<script setup lang="ts">
import type { Vehicle } from "@bycar-in-ua/sdk";
import AvailableCar from "./AvailableCar.vue";
import DiscountCar from "./DiscountCar.vue";
import CarCardTemplate from "./CarCardTemplate.vue";

const props = defineProps<{
  car: Vehicle;
  title?: string;
  discount?: boolean;
  isSaved?: boolean;
  isCompared?: boolean;
  toggleSave?: (carId: number, title?: string) => Promise<void>;
  toggleCompare?: (carId: number, title?: string) => Promise<void>;
}>();

// TODO: use props
const isAvailableCar = true;
const isDiscountCar = false;
</script>

<template>
  <AvailableCar v-if="isAvailableCar" v-bind="props" />
  <DiscountCar v-else-if="isDiscountCar" v-bind="props" />
  <CarCardTemplate v-else v-bind="props"></CarCardTemplate>
</template>
