<script setup lang="ts">
import type { VehicleSearchDocument } from "@bycar-in-ua/vehicles-sdk";

type Status = "avalible" | "discount" | "prev-model";

const props = defineProps<{ car: VehicleSearchDocument; }>();

const status = computed<Status | undefined>(() => {
  if (props.car.discountedPrice) {
    return "discount";
  }

  if (props.car.hasAvailableInstances) {
    return "avalible";
  }

  if (!props.car.isCurrentProduction) {
    return "prev-model";
  }

  return undefined;
});

const content: Record<Status, { icon: string;
  text: string; }> = {
  "avalible": {
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
