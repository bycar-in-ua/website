<script setup lang="ts">
import { PRICE_STEP } from "#shared/priceTemplates";
import { refWithControl, useDebounceFn } from "@vueuse/core";

const props = defineProps<{
  boundaries?: {
    min?: number;
    max?: number;
  };
}>();

const minPrice = defineModel<number>("minPrice");
const maxPrice = defineModel<number>("maxPrice");

const debouncedModelUpdate = useDebounceFn((value: number[]) => {
  minPrice.value = value[0];
  if (Number.isFinite(value[1])) {
    maxPrice.value = value[1];
  }
}, 500);

const sliderModel = refWithControl([minPrice.value || 0, maxPrice.value || props.boundaries?.max || Infinity], { onChanged: debouncedModelUpdate });

const minInputModel = computed({
  get: () => sliderModel.value[0] || props.boundaries?.min || 0,
  set: (value: number) => {
    sliderModel.value = [value, sliderModel.value[1] || props.boundaries?.max || Infinity];
  },
});

const maxInputModel = computed({
  get: () => sliderModel.value[1] || props.boundaries?.max || Infinity,
  set: (value: number) => {
    sliderModel.value = [sliderModel.value[0] || props.boundaries?.min || 0, value];
  },
});

const currencyFormatterConfig = {
  style: "currency",
  currency: "USD",
  currencyDisplay: "symbol",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
} as const;
</script>

<template>
  <div class="flex gap-2 items-center mb-4">
    <div class="grow">
      <slot name="min-price-label" />
      <UInputNumber
        v-model="minInputModel"
        :step="PRICE_STEP"
        :min="boundaries?.min"
        :max="(boundaries?.max || Infinity) - PRICE_STEP"
        :placeholder="boundaries?.min?.toString()"
        size="sm"
        class="w-full"
        :format-options="currencyFormatterConfig"
      />
    </div>
    <div class="grow">
      <slot name="max-price-label" />
      <UInputNumber
        v-model="maxInputModel"
        :step="PRICE_STEP"
        :min="(boundaries?.min || 0) + PRICE_STEP"
        :max="boundaries?.max"
        :placeholder="boundaries?.max?.toString()"
        size="sm"
        class="w-full"
        :format-options="currencyFormatterConfig"
      />
    </div>
  </div>

  <USlider
    v-model="sliderModel"
    :min="boundaries?.min"
    :max="boundaries?.max"
    :step="PRICE_STEP"
    :ui="{
      root: 'w-[99%] mx-auto',
    }"
  />
</template>
