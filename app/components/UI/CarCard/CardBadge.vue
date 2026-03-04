<script setup lang="ts">
import type { VehicleSearchDocument } from "@bycar-in-ua/vehicles-sdk";
import type { CardStatus } from "./interface";

const props = defineProps<{ car: VehicleSearchDocument; }>();

const status = computed<CardStatus | undefined>(() => {
  if (props.car.discountedPrice) {
    return "discount";
  }

  if (props.car.hasAvailableInstances) {
    return "available";
  }

  if (!props.car.isCurrentProduction) {
    return "prev-model";
  }

  return undefined;
});

const content: Record<CardStatus, { icon: string;
  text: string; }> = {
  "available": {
    icon: "i-lucide-clock",
    text: "Доступно зараз",
  },
  "discount": {
    icon: "i-lucide-percent",
    text: "Знижка",
  },
  "prev-model": {
    icon: "i-lucide-circle-minus", // TODO: change icon and text
    text: "Попередня модель",
  },
};
</script>

<template>
  <UBadge
    v-if="status"
    :icon="content[status].icon"
    :label="content[status].text"
    variant="solid"
    :color="status === 'prev-model' ? 'secondary' : 'primary'"
  />
</template>
