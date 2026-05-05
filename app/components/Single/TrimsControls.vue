<script setup lang="ts">
import SelectionCard from "~/components/UI/SelectionCard.vue";
import { getPowerUnitTitle, getPowerUnitSubtitle } from "~/components/Single/helpers";
import type { PowerUnitView, TrimView } from "@bycar-in-ua/vehicles-sdk";

type TrimsControlsProps = {
  trims: TrimView[];
  activeTrim?: TrimView;
  setActiveTrim: (c: TrimView) => void;
  powerUnits: PowerUnitView[];
  activePowerUnit?: PowerUnitView;
  setActivePowerUnit: (p: PowerUnitView) => void;
};

const props = defineProps<TrimsControlsProps>();

// May be dynamic in the future
const formattingOptions: Intl.NumberFormatOptions = {
  currency: "USD",
  currencyDisplay: "narrowSymbol",
  trailingZeroDisplay: "stripIfInteger",
};

const hoveredTrim = ref<TrimView | null>(null);
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

const hoveredPowerUnit = ref<PowerUnitView | null>(null);
const powerUnitPrice = computed(() => {
  const pu = hoveredPowerUnit.value ?? props.activePowerUnit;

  if (!pu) {
    return;
  }

  return formatCurrency(pu.price, formattingOptions);
});
</script>

<template>
  <h3 class="mb-3 sm:text-lg font-semibold text-gray-900">
    Комплектації
    <span class="text-dimmed pl-2" data-testid="trims-price-range">{{ trimsPriceRange }}</span>
  </h3>

  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5" data-testid="trims-list">
    <SelectionCard
      v-for="trim in trims"
      :key="trim.id"
      :title="trim.displayName"
      :selected="trim.id === activeTrim?.id"
      indicator-type="radio"
      @click="() => setActiveTrim(trim)"
      @mouseover="hoveredTrim = trim"
      @mouseleave="hoveredTrim = null"
    />
  </div>

  <h3 class="mt-8 mb-3 sm:text-lg font-semibold text-gray-900">
    Силові агрегати
    <span class="text-dimmed pl-2" data-testid="power-units-price">{{ powerUnitPrice }}</span>
  </h3>

  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5" data-testid="power-units-list">
    <SelectionCard
      v-for="powerUnit in powerUnits"
      :key="powerUnit.id"
      :title="getPowerUnitTitle(powerUnit)"
      :subtitle="getPowerUnitSubtitle(powerUnit, $t)"
      :selected="powerUnit.id === activePowerUnit?.id"
      indicator-type="radio"
      @click="() => setActivePowerUnit(powerUnit)"
      @mouseover="hoveredPowerUnit = powerUnit"
      @mouseleave="hoveredPowerUnit = null"
    />
  </div>
</template>
