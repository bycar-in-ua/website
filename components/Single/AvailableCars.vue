<script setup lang="ts">
import type { Vehicle } from "@bycar-in-ua/sdk";
import CarCard from "@/components/UI/CarCard/CarCard.vue";
import { getCarTitle } from "@/utils/carHelpers";
import SectionTitle from "./SectionTitle.vue";
import type { Availability } from "./interface";

const props = defineProps<{
  car: Vehicle;
  availability: Record<string, Availability>;
}>();

const carTitle = getCarTitle(props.car);

type AvailableCar = Vehicle & { title: string; availability: Availability };

const availableCars = computed<AvailableCar[]>(() => {
  return Object.entries(props.availability)
    .map(([complectationId, availability]) => {
      const complectation = props.car.complectations?.find(
        (c) => c.id === Number(complectationId),
      );

      if (!complectation) {
        return;
      }

      return {
        ...props.car,
        title: `${carTitle} ${complectation.displayName}`,
        featureImage: availability.images?.[0],
        complectations: [complectation],
        availability,
      };
    })
    .filter(Boolean) as AvailableCar[];
});
</script>

<template>
  <section>
    <SectionTitle class="mb-4">
      Авто в наявності
    </SectionTitle>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <CarCard
        v-for="availableCar in availableCars"
        :key="availableCar.id"
        :car="availableCar"
        :title="availableCar.title"
      />
    </div>
  </section>
</template>
