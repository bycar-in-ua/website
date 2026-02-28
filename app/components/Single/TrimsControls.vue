<script setup lang="ts">
import type { Complectation, PowerUnit } from "@bycar-in-ua/sdk";
import Control from "./Control.vue";
import { getPowerUnitTitle, getPowerUnitSubtitle } from "~/components/Single/helpers";

type TrimsControlsProps = {
  trims: Complectation[];
  activeTrim?: Complectation;
  setActiveTrim: (c: Complectation) => void;
  powerUnits: PowerUnit[];
  activePowerUnit?: PowerUnit;
  setActivePowerUnit: (p: PowerUnit) => void;
};

const props = defineProps<TrimsControlsProps>();

// May be dynamic in the future
const formattingOptions: Intl.NumberFormatOptions = {
  currency: "USD",
  currencyDisplay: "narrowSymbol",
  trailingZeroDisplay: "stripIfInteger",
};

const hoveredTrim = ref<Complectation | null>(null);
const trimsPriceRange = computed(() => {
  const prices = (hoveredTrim.value ?? props.activeTrim)?.powerUnits?.map((pu) => pu.price) ?? [];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const formattedMinPrice = formatCurrency(minPrice, formattingOptions);

  if (minPrice === maxPrice) {
    return formattedMinPrice;
  }

  const formattedMaxPrice = formatCurrency(maxPrice, formattingOptions);

  return `${formattedMinPrice} - ${formattedMaxPrice}`;
});

const hoveredPowerUnit = ref<PowerUnit | null>(null);
const powerUnitPrice = computed(() => {
  const pu = hoveredPowerUnit.value ?? props.activePowerUnit;

  if (!pu) {
    return;
  }

  return formatCurrency(pu.price, formattingOptions);
});
</script>

<template>
  <h3 class="mb-3 text-lg font-semibold text-gray-900">
    Комплектації
    <span class="text-dimmed pl-2">{{ trimsPriceRange }}</span>
  </h3>

  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
    <Control
      v-for="trim in trims"
      :key="trim.id"
      :title="trim.displayName"
      :active="trim.id === activeTrim?.id"
      @click="() => setActiveTrim(trim)"
      @mouseover="hoveredTrim = trim"
      @mouseleave="hoveredTrim = null"
    />
  </div>

  <h3 class="mt-8 mb-3 text-lg font-semibold text-gray-900">
    Силові агрегати
    <span class="text-dimmed pl-2">{{ powerUnitPrice }}</span>
  </h3>

  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
    <Control
      v-for="powerUnit in powerUnits"
      :key="powerUnit.id"
      :title="getPowerUnitTitle(powerUnit)"
      :subtitle="getPowerUnitSubtitle(powerUnit, $t)"
      :active="powerUnit.id === activePowerUnit?.id"
      @click="() => setActivePowerUnit(powerUnit)"
      @mouseover="hoveredPowerUnit = powerUnit"
      @mouseleave="hoveredPowerUnit = null"
    />
  </div>
</template>
