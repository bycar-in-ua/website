<script setup lang="ts">
import type { VehicleSearchDocument } from "@bycar-in-ua/vehicles-sdk";
import CardBadge from "./CardBadge.vue";
import CardData from "./CardData.vue";
import SaveButtons from "./SaveButtons.vue";
import CardMedia from "./CardMedia.vue";
import { getVehicleInfoBullets } from "./helpers";
import type { CardType } from "./interface";

const props = defineProps<{
  car: VehicleSearchDocument;
  cardType: CardType;
}>();

const { t } = useI18n();

const infoBullets = computed(() => getVehicleInfoBullets(props.car, t));
</script>

<template>
  <div
    class="flex flex-col relative group cursor-pointer border border-gray-200 bg-white"
  >
    <CardMedia :car-title="car.title" :img-path="car.featureImage?.path">
      <CardBadge :car />
      <SaveButtons
        :car-id="car.id"
        :card-type="cardType"
      />
    </CardMedia>

    <CardData
      :title="car.title"
      :location="car.dealerLocation"
      :info-bullets="infoBullets"
      :min-price="car.minPrice"
      :max-price="car.maxPrice"
      :discounted-price="car.discountedPrice"
      :price-format="{
        currency: cardType === 'model' ? 'USD' : 'UAH',
        currencyDisplay: 'narrowSymbol',
        trailingZeroDisplay: 'stripIfInteger',
      }"
      class="grow p-4"
    />

    <div
      class="absolute top-full hidden group-hover:block -inset-x-px px-4 pb-4 bg-white border border-t-0 border-gray-200 z-10"
    >
      <slot name="cta">
        <UButton block>
          Дізнатися деталі
        </UButton>
      </slot>
    </div>
  </div>
</template>
