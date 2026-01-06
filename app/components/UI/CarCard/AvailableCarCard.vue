<script setup lang="ts">
import CardBadge from "./CardBadge.vue";
import CardMedia from "./CardMedia.vue";
import SaveButtons from "./SaveButtons.vue";
import CardData from "./CardData.vue";
import ChatCTA from "./ChatCTA.vue";
import { getVehicleInfoBullets } from "./helpers";
import type { AvailableCar } from "~/components/Single/interface";
import DiscountPrice from "./DiscountPrice.vue";

const props = defineProps<{
  car: AvailableCar;
  discount?: boolean;
  isSaved?: boolean;
  isCompared?: boolean;
}>();

const { t } = useI18n();

const infoBullets = computed(() =>
  props.car.vehicle ? getVehicleInfoBullets(props.car.vehicle, t) : [],
);
const status = props.discount ? "discount" : "avalible";

// TODO: use real data
const location = "Київ, Автодім Атлант Київ Захід";
</script>

<template>
  <div
    class="relative flex flex-col group cursor-pointer border border-gray-200 border-b-0"
  >
    <CardMedia
      :car-title="car.title"
      :img-path="
        car.images?.[0]?.image?.path ?? car.vehicle?.featureImage?.path // TODO: check image path
      "
    >
      <CardBadge :status />
      <SaveButtons
        :car-id="car.id"
        :car-title="car.title"
        :is-saved
        :is-compared
      />
    </CardMedia>

    <CardData :car-title="car.title" :info-bullets :price-rang="car.price">
      <template v-if="status === 'discount'" #header>
        <div class="space-y-1.5">
          <div class="text-gray-500 flex items-center gap-1">
            <UIcon name="i-lucide-map-pin" />
            {{ location }}
          </div>

          <h3 class="text-lg font-bold">
            {{ car.title }}
          </h3>
        </div>
      </template>

      <template v-if="status === 'discount'" #price>
        <!-- <span class="text-gray-500 text-base font-medium line-through">
          ${{ fullPrice }}
        </span>
        <span class="text-black text-lg font-bold">${{ price }}</span> -->

        <!-- TODO: update styles inside DiscountPrice component -->
        <DiscountPrice
          :price="`UAH ${car.price.toLocaleString()}`"
          :discount-price="
            car.discountPrice
              ? `UAH ${car.discountPrice?.toLocaleString()}`
              : undefined
          "
        />
      </template>
    </CardData>

    <ChatCTA />
  </div>
</template>
