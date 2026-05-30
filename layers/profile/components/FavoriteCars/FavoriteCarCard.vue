<script setup lang="ts">
import type { VehicleSearchDocument } from "@bycar-in-ua/vehicles-sdk";
import { CarCardMedia, CarCardBadge, CarCardData } from "~/components/UI/CarCard";
import { getVehicleInfoBullets } from "~/components/UI/CarCard/helpers";
import type { CardType } from "~/components/UI/CarCard/interface";

const props = defineProps<{
  car: VehicleSearchDocument;
  cardType: CardType;
}>();

const { t } = useI18n();

const infoBullets = computed(() => getVehicleInfoBullets(props.car, t).filter(Boolean));

const { toggleFavorite } = useProfile();
</script>

<template>
  <div class="group md:flex overflow-hidden border border-gray-200 relative">
    <CarCardMedia :img-path="car.featureImage?.path" :car-title="car.title" class="md:max-w-74">
      <CarCardBadge :car />
    </CarCardMedia>

    <CarCardData
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

    <UButton
      variant="outline"
      color="secondary"
      icon="i-lucide-trash-2"
      square
      class="absolute top-4 right-4 rounded-full bg-default z-10"
      title="Видалити з обраного"
      @click.prevent.stop="toggleFavorite({ carId: car.id, carType: cardType })"
    />
  </div>
</template>
