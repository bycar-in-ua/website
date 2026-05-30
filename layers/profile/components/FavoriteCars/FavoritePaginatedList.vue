<script setup lang="ts">
import type { PaginatedResponse, VehicleSearchDocument } from "@bycar-in-ua/vehicles-sdk";
import type { CardType } from "~/components/UI/CarCard";
import Pagination from "~/components/UI/Pagination.vue";
import FavoriteCarCard from "./FavoriteCarCard.vue";

defineProps<{
  data: PaginatedResponse<VehicleSearchDocument>;
  cardType: CardType;
  loading?: boolean;
}>();

const page = defineModel<number>("page");

const getCarRoute = (car: {
  id: number;
  slug?: string;
}, type: CardType) => {
  if (type === "available") {
    return {
      name: "AvailableCarSingle",
      params: { id: car.id },
    };
  }

  return {
    name: "SingleCar",
    params: { slug: car.slug },
  };
};
</script>

<template>
  <div class="space-y-3 sm:space-y-4 relative" :class="{ 'blur-xs': loading }">
    <UProgress v-if="loading" class="absolute -top-2" />

    <NuxtLink
      v-for="car in data.items"
      :key="car.id"
      :to="getCarRoute(car, cardType)"
      class="block"
    >
      <FavoriteCarCard
        :car="car"
        :card-type="cardType"
      />
    </NuxtLink>

    <Pagination
      v-model:page="page"
      class="flex justify-center"
      :pagination="data.meta"
    />
  </div>
</template>
