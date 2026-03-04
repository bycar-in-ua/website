<script setup lang="ts">
import type { VehicleSearchDocument } from "@bycar-in-ua/vehicles-sdk";
import { getVehicleInfoBullets } from "~/components/UI/CarCard/helpers";

const props = defineProps<{ car: VehicleSearchDocument; }>();

const { t } = useI18n();

const infoBullets = computed(() => getVehicleInfoBullets(props.car, t));

const priceRange = computed(() => {
  const minPrice = formatCurrency(props.car.minPrice, {
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    trailingZeroDisplay: "stripIfInteger",
  });

  if (!props.car.maxPrice) {
    return minPrice;
  }

  const maxPrice = formatCurrency(props.car.maxPrice, {
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    trailingZeroDisplay: "stripIfInteger",
  });

  return `${minPrice} - ${maxPrice}`;
});

const discountedPrice = computed(() => {
  if (!props.car.discountedPrice) {
    return;
  }

  return formatCurrency(props.car.discountedPrice, {
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    trailingZeroDisplay: "stripIfInteger",
  });
});
</script>

<template>
  <div class="relative flex flex-col p-4 space-y-4.5">
    <div>
      <span v-if="car.dealerLocation" class="inline-flex gap-1 items-center mb-1.5 text-dimmed">
        <UIcon name="i-lucide-map-pin" class="size-4 shrink-0" />
        {{ car.dealerLocation }}
      </span>

      <h3 class="text-lg font-bold">
        {{ car.title }}
      </h3>
    </div>

    <div class="flex flex-wrap gap-2">
      <UBadge
        v-for="(bullet, index) in infoBullets"
        :key="index"
        color="secondary"
        :label="bullet "
      />
    </div>

    <div class="space-x-2 mt-auto">
      <span v-if="discountedPrice" class="text-dimmed font-medium line-through">{{ priceRange }}</span>
      <span class="text-black text-lg font-bold">{{ discountedPrice || priceRange }}</span>
    </div>
  </div>
</template>
