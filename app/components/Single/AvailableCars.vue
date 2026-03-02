<script setup lang="ts">
import SectionTitle from "./SectionTitle.vue";
import AvailableCarModal from "./AvailableCarModal.vue";
import CarCard from "../UI/CarCard/CardRoot.vue";
import type { VehicleSearchDocument, VehicleView } from "@bycar-in-ua/vehicles-sdk";

defineProps<{
  car: VehicleView;
  availability: VehicleSearchDocument[];
}>();

const overlay = useOverlay();

const availableModal = overlay.create(AvailableCarModal);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function openModal(car: any) {
  availableModal.open({ car });
}
</script>

<template>
  <section id="available-cars">
    <SectionTitle class="text-xl font-semibold mb-4">
      Авто в наявності
    </SectionTitle>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <CarCard
        v-for="availableCar in availability"
        :key="availableCar.id"
        :car="availableCar"
        class="cursor-pointer"
        @click="() => openModal(availableCar)"
      />
    </div>
  </section>
</template>
