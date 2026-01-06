<script setup lang="ts">
import type { Vehicle } from "@bycar-in-ua/sdk";
import { getVehicleInfoBullets } from "./helpers";
import CardBadge from "./CardBadge.vue";
import ChatCTA from "./ChatCTA.vue";
import CardData from "./CardData.vue";
import SaveButtons from "./SaveButtons.vue";
import CardMedia from "./CardMedia.vue";

const props = defineProps<{
  car: Vehicle;
  title?: string;
  discount?: boolean;
  isSaved?: boolean;
  isCompared?: boolean;
}>();

const { t } = useI18n();

const carTitle = computed(() => props.title ?? getCarTitle(props.car));
const priceRange = computed(() => getPriceRange(props.car.complectations));
const infoBullets = computed(() => getVehicleInfoBullets(props.car, t));

// TODO: use real data
const status = computed(() => {
  // return "avalible";
  // return "discount";
  // return "prev-model";
  return undefined;
});
</script>

<template>
  <div
    class="relative flex flex-col group cursor-pointer border border-gray-200 border-b-0"
  >
    <CardMedia :car-title :img-path="car.featureImage?.path">
      <CardBadge :status />
      <SaveButtons
        :car-id="car.id"
        :car-title
        :is-saved
        :is-compared
      />
    </CardMedia>

    <CardData :car-title :info-bullets :price-range />

    <ChatCTA />
  </div>
</template>
