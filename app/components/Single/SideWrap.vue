<script setup lang="ts">
import { getInfoBullets, getPowerUnitTitle } from "./helpers";
import type { PowerUnitView, VehicleSearchDocument, VehicleView } from "@bycar-in-ua/vehicles-sdk";

const props = defineProps<{
  car: VehicleView;
  powerUnit?: PowerUnitView | null;
  availableVehicles?: VehicleSearchDocument[];
}>();

const { t } = useI18n();

const infoBullets = computed(() =>
  getInfoBullets(
    {
      car: props.car,
      powerUnit: props.powerUnit,
    },
    t,
  ),
);

const carTitle = computed(() => {
  const brand = props.car.brand?.displayName || "";
  const model = props.car.model || "";
  return `${brand} ${model}`.trim();
});

const powerUnitTitle = computed(() => {
  if (!props.powerUnit) return "";
  return getPowerUnitTitle(props.powerUnit);
});

const yearsRange = computed(() => {
  return [props.car.yearFrom, props.car.yearTo]
    .filter(Boolean)
    .join("-");
});

const cdnImage = useCdnImage();
</script>

<template>
  <UCard class="sticky top-4">
    <template #header>
      <!-- Brand logo and car title -->
      <div class="flex items-start gap-4">
        <div v-if="car.brand?.logo" class="size-14 bg-black flex items-center justify-center shrink-0 p-2">
          <img :src="cdnImage(car.brand?.logo, 'thumbnail')" :alt="car.brand.displayName" class="w-full h-full object-contain invert grayscale brightness-100">
        </div>
        <div>
          <h2 class="text-xl font-bold">
            {{ carTitle }}
          </h2>
          <p v-if="powerUnitTitle" class="text-lg font-bold">
            {{ powerUnitTitle }}
          </p>
        </div>
      </div>

      <!-- Price and action buttons -->
      <div class="flex items-center justify-between mt-6">
        <div v-if="powerUnit?.price" class="text-xl font-bold">
          {{ formatCurrency(powerUnit.price, { currency: 'USD', style: 'currency', currencyDisplay: 'narrowSymbol', minimumSignificantDigits: 2 }) }}
        </div>
        <div v-else class="text-2xl font-semibold text-gray-500 dark:text-gray-400">
          {{ t('vehicle.priceOnRequest') }}
        </div>
        <div class="flex gap-3">
          <UButton
            icon="i-lucide-bookmark"
            color="neutral"
            variant="outline"
            circle
            class="rounded-full"
            :aria-label="t('actions.addToFavorites')"
          />
          <UButton
            icon="i-lucide-scale"
            color="neutral"
            variant="outline"
            square
            class="rounded-full"
            :aria-label="t('actions.compare')"
          />
        </div>
      </div>
    </template>

    <!-- Specifications list -->
    <div class="space-y-0">
      <div
        v-for="(bullet, index) in infoBullets"
        :key="index"
        class="flex items-center justify-between py-4"
        :class="{ 'border-t border-gray-200 dark:border-gray-800': index > 0 }"
      >
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
          {{ bullet.title }}
        </span>
        <span class="text-sm font-semibold text-gray-900 dark:text-white text-right">
          {{ bullet.value }}
        </span>
      </div>

      <div
        v-if="yearsRange"
        class="flex items-center justify-between py-4 border-t border-gray-200 dark:border-gray-800"
      >
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
          {{ t('vehicle.modelYear') }}
        </span>
        <span class="text-sm font-semibold text-gray-900 dark:text-white text-right">
          {{ yearsRange }}
        </span>
      </div>
    </div>

    <template #footer>
      <!-- Action buttons -->
      <div class="space-y-3">
        <UButton
          v-if="availableVehicles && availableVehicles.length > 0"
          block
          size="xl"
          color="primary"
          variant="solid"
          class="font-semibold"
        >
          {{ availableVehicles.length }} авто в наявності
        </UButton>
        <UButton
          block
          size="xl"
          color="primary"
          variant="outline"
          class="font-semibold"
        >
          Отримати консультацію
        </UButton>
      </div>
    </template>
  </UCard>
</template>
