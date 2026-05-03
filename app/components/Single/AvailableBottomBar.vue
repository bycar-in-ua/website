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
    <div class="container py-3 flex items-center justify-end">
      <WrapTitle
        :brand="car.brand"
        :title="carTitle"
        :subtitle="powerUnitTitle"
        class="me-auto"
      />

      <div class="flex flex-col gap-2">
        <div v-if="basePrice" class="flex items-center gap-2">
          <span class="text-sm font-medium text-dimmed line-through">
            {{ basePrice }}
          </span>
        </div>
        <p class="text-xl font-bold uppercase">
          {{ currentPrice }}
        </p>
      </div>

      <div class="flex gap-3 ms-6">
        <UButton
          color="primary"
          variant="solid"
          class=""
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
          class="rounded-full"
          title="Додати у обране"
        />
      </div>
    </div>
  </div>
</template>
