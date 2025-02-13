<script setup lang="ts">
import type { Vehicle } from "@bycar-in-ua/sdk";
import CarCard from "@/components/UI/CarCard/CarCard.vue";
import { getCarTitle } from "@/utils/carHelpers";
import SectionTitle from "./SectionTitle.vue";
import AvailableCarModal from "./AvailableCarModal.vue";
import type { Availability, AvailableCar } from "./interface";

const props = defineProps<{
  car: Vehicle;
  availability: Record<string, Availability[]>;
}>();

const carTitle = getCarTitle(props.car);

const availableCars = computed<AvailableCar[]>(() => {
  return Object.entries(props.availability)
    .flatMap(([complectationId, availability]) => {
      const complectation = props.car.complectations?.find(
        (c) => c.id === Number(complectationId),
      );

      if (!complectation) {
        return;
      }

      return availability.map((avlbl) => {
        const powerUnit =
          complectation.powerUnits?.find(
            ({ id }) => id === avlbl.powerUnitId,
          ) ?? complectation.powerUnits?.[0];

        return {
          ...props.car,
          title: `${carTitle} ${complectation.displayName}`,
          featureImage: avlbl.images?.[0],
          complectations: [{ ...complectation, powerUnits: [powerUnit] }],
          availability: avlbl,
        };
      });
    })
    .filter(Boolean) as AvailableCar[];
});

const open = ref(false);
const targetCar = ref<AvailableCar | null>(null);

function openModal(car: AvailableCar) {
  targetCar.value = car;
  open.value = true;
}
</script>

<template>
  <section id="available-cars">
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
        class="cursor-pointer"
        @click="() => openModal(availableCar)"
      />
    </div>
    <AvailableCarModal v-if="targetCar" v-model:open="open" :car="targetCar" />
  </section>
</template>
