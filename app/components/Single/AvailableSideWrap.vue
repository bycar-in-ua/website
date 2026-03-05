<script setup lang="ts">
import type { AvailableVehicleView } from "@bycar-in-ua/vehicles-sdk";
import { getPowerUnitTitle } from "~/components/Single/helpers";
import WrapTitle from "./WrapTitle.vue";

const props = defineProps<{ car: AvailableVehicleView; }>();

const carTitle = computed(() => {
  const brand = props.car.brand?.displayName || "";
  const model = props.car.model || "";
  const trim = props.car.trim?.displayName || "";
  return `${brand} ${model} ${trim}`.trim();
});

const powerUnitTitle = computed(() => {
  const powerUnit = props.car.trim?.powerUnits?.[0];

  if (!powerUnit) return "";

  return getPowerUnitTitle(powerUnit);
});
</script>

<template>
  <UCard class="max-w-102">
    <WrapTitle :brand="car.brand" :title="carTitle" :subtitle="powerUnitTitle" />

    <div class="inline-flex gap-1 items-center my-4 text-dimmed">
      <UIcon name="i-lucide-map-pin" class="size-4 shrink-0" />
      Київ, Автодім Атлант Київ Захід
    </div>
  </UCard>
</template>
