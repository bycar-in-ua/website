<script setup lang="ts">
import { getInfoBullets, getPowerUnitTitle } from "./helpers";
import type { PowerUnitView, VehicleSearchDocument, VehicleView } from "@bycar-in-ua/vehicles-sdk";
import WrapTitle from "./WrapTitle.vue";
import { useProfile } from "#layers/profile/composables/useProfile";

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

const profile = useProfile();
const { toggleSave, isPending } = useSavedCarActions();

const isSaved = computed(() => profile.data.value?.savedCars?.includes(props.car.id) ?? false);

function handleCompare() {
  alert("Compare functionality is not yet implemented.");
}
</script>

<template>
  <UCard class="sticky top-4">
    <template #header>
      <WrapTitle :brand="car.brand" :title="carTitle" :subtitle="powerUnitTitle" />

      <div class="flex items-center justify-between mt-6">
        <div v-if="powerUnit?.price" class="text-xl font-bold">
          {{ formatCurrency(powerUnit.price, { currency: 'USD', style: 'currency', currencyDisplay: 'narrowSymbol', minimumSignificantDigits: 2 }) }}
        </div>
        <div v-else class="text-2xl font-semibold text-gray-500 dark:text-gray-400">
          {{ t('vehicle.priceOnRequest') }}
        </div>
        <div class="flex gap-3">
          <UButton
            variant="outline"
            color="neutral"
            :icon="isSaved ? 'i-lucide-bookmark-check' : 'i-lucide-bookmark'"
            circle
            class="rounded-full"
            :loading="isPending"
            :aria-label="t('actions.addToFavorites')"
            @click="toggleSave(car.id, carTitle)"
          />
          <UButton
            icon="i-lucide-scale"
            color="neutral"
            variant="outline"
            square
            class="rounded-full"
            :aria-label="t('actions.compare')"
            @click="handleCompare"
          />
        </div>
      </div>
    </template>

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
      <div class="space-y-3">
        <UButton
          v-if="availableVehicles && availableVehicles.length > 0"
          block
          size="xl"
          color="primary"
          variant="solid"
          class="font-semibold"
          @click="scrollIntoView('#available-vehicles')"
        >
          {{ availableVehicles.length }} авто в наявності
        </UButton>
        <UButton
          block
          size="xl"
          color="primary"
          variant="outline"
          class="font-semibold"
          @click="scrollIntoView('#contact-container')"
        >
          Отримати консультацію
        </UButton>
      </div>
    </template>
  </UCard>
</template>
