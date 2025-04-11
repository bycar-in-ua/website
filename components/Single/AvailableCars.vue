<script setup lang="ts">
import type { Vehicle, AvailableVehicle } from "@bycar-in-ua/sdk";
import CarCard from "@/components/UI/CarCard/CarCard.vue";
import DiscountPrice from "@/components/UI/CarCard/DiscountPrice.vue";
import { getCarTitle } from "@/utils/carHelpers";
import SectionTitle from "./SectionTitle.vue";
import AvailableCarModal from "./AvailableCarModal.vue";
import type { AvailableCar } from "./interface";
import { discounts } from "./discounts.temp";
const props = defineProps<{
  car: Vehicle;
  availability: AvailableVehicle[];
}>();

const carTitle = getCarTitle(props.car);

const availableCars = computed<AvailableCar[]>(() => {
  return props.availability
    .map((availableVehicle) => {
      const complectation = props.car.complectations?.find(
        (c) => c.id === availableVehicle.complectationId,
      );

      if (!complectation) {
        return;
      }

      const powerUnit = complectation.powerUnits?.find(
        ({ id }) => id === availableVehicle.powerUnitId,
      );

      const availableComplectation = {
        ...complectation,
        powerUnits: [powerUnit],
      };

      const discount = discounts[availableVehicle.id];

      return {
        ...props.car,
        ...availableVehicle,
        title: `${carTitle} ${complectation.displayName}`,
        featureImage: availableVehicle.images?.[0].image,
        complectations: [availableComplectation],
        complectation: availableComplectation,
        ...discount,
      };
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
        :discount="!!availableCar.discountPrice"
        @click="() => openModal(availableCar)"
      >
        <template #price>
          <DiscountPrice :price="`UAH ${availableCar.price.toLocaleString()}`" :discount-price="availableCar.discountPrice ? `UAH ${availableCar.discountPrice?.toLocaleString()}` : undefined" />
        </template>
      </CarCard>
    </div>
    <AvailableCarModal v-if="targetCar" v-model:open="open" :car="targetCar" />
  </section>
</template>
