<script setup lang="ts">
import type { AvailableVehicleView } from "@bycar-in-ua/vehicles-sdk";
import { useCarRequestSlideover } from "#layers/crm/composables/useCarRequestSlideover";
import WrapTitle from "~/components/UI/WrapTitle.vue";

type Props = {
  car: AvailableVehicleView;
  carTitle: string;
  powerUnitTitle: string;
  currentPrice: string;
  basePrice?: string;
};

defineProps<Props>();

const carRequestSlideover = useCarRequestSlideover();
</script>

<template>
  <div class="bg-default">
    <div class="md:container md:py-3 flex max-md:flex-wrap items-center md:justify-end">
      <WrapTitle
        :brand="car.brand"
        :title="carTitle"
        :subtitle="powerUnitTitle"
        class="md:me-auto max-md:basis-1/2 max-md:py-4.5 max-md:ps-4"
        logo-class="max-sm:hidden"
      />

      <div class="flex flex-col gap-2 max-md:basis-1/2 max-md:px-4 text-right">
        <div v-if="basePrice" class="flex items-center gap-2">
          <span class="text-sm font-medium text-dimmed line-through">
            {{ basePrice }}
          </span>
        </div>
        <p class="text-xl font-bold uppercase">
          {{ currentPrice }}
        </p>
      </div>

      <div class="flex flex-col sm:flex-row md:items-center gap-2 md:gap-3 md:ms-6 max-md:p-4 max-md:basis-full max-md:border-t border-gray-200">
        <UButton
          color="primary"
          variant="solid"
          class="sm:max-md:basis-full justify-center"
          @click="carRequestSlideover.open({
            vehicleId: car.vehicleId,
            availableVehicleId: car.id,
            trimId: car.trim?.id,
            powerUnitId: car.trim?.powerUnits?.[0]?.id,
            direct: true,
          })"
        >
          Отримати цю пропозицію
        </UButton>

        <UButton
          color="primary"
          variant="outline"
          class="sm:max-md:basis-full justify-center"
          @click="carRequestSlideover.open({
            vehicleId: car.vehicleId,
            availableVehicleId: car.id,
            trimId: car.trim?.id,
            powerUnitId: car.trim?.powerUnits?.[0]?.id,
            direct: false,
          })"
        >
          Запитати інші пропозиції
        </UButton>

        <UButton
          icon="i-lucide-bookmark"
          color="neutral"
          variant="outline"
          class="rounded-full hidden md:flex"
          title="Додати у обране"
        />
      </div>
    </div>
  </div>
</template>
