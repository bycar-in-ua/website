<script setup lang="ts">
import CardBadge from "./CardBadge.vue";
import CardData from "./CardData.vue";
import SaveButtons from "./SaveButtons.vue";
import CardMedia from "./CardMedia.vue";
import type { VehicleSearchDocument } from "@bycar-in-ua/vehicles-sdk";

defineProps<{ car: VehicleSearchDocument; }>();
</script>

<template>
  <div
    class="flex flex-col relative group cursor-pointer border border-gray-200 bg-white"
  >
    <CardMedia :car-title="car.title" :img-path="car.featureImage?.path">
      <CardBadge :car />
      <SaveButtons
        :car-id="car.id"
        :car-title="car.title"
      />
    </CardMedia>

    <CardData :car class="grow" />

    <div
      class="absolute z-30 -inset-x-px bottom-0 px-4 pb-4 translate-y-0 group-hover:translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white border border-t-0 border-gray-200"
    >
      <slot name="cta">
        <UButton block>
          Дізнатися деталі
        </UButton>
      </slot>
    </div>
  </div>
</template>
