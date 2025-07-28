<script setup lang="ts">
import CollapsibleTitle from "@/components/UI/CollapsibleTitle.vue";
import { MAX_PRICE, MIN_PRICE, PRICE_STEP } from "~/shared/priceTemplates";

const { t } = useI18n();

const priceFrom = defineModel<number>("priceFrom");
const priceTo = defineModel<number>("priceTo");

const maxPriceFrom = computed(() => {
  return priceTo.value ? priceTo.value - PRICE_STEP : MAX_PRICE;
});
const minPriceTo = computed(() => {
  return priceFrom.value ? priceFrom.value + PRICE_STEP : MIN_PRICE;
});

const priceSliderModel = computed({
  get: () => [Number(priceFrom.value ?? 0), Number(priceTo.value ?? Infinity)],
  set: ([from, to]: number[]) => {
    priceFrom.value = from;
    if (isFinite(to)) {
      priceTo.value = to;
    }
  },
});
</script>

<template>
  <UCollapsible :default-open="true" :ui="{ content: 'pb-2' }">
    <template #default="{ open }">
      <CollapsibleTitle :title="t('price')" :open />
    </template>

    <template #content>
      <div class="flex gap-2 items-center mb-4">
        <UInputNumber
          v-model="priceFrom"
          :step="PRICE_STEP"
          :min="MIN_PRICE"
          :max="maxPriceFrom"
          size="sm"
          :format-options="{
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }"
        />
        <span class="basis-2">-</span>
        <UInputNumber
          v-model="priceTo"
          :step="PRICE_STEP"
          :min="minPriceTo"
          :max="MAX_PRICE"
          size="sm"
          :format-options="{
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }"
        />
      </div>

      <USlider
        v-model="priceSliderModel"
        :min="MIN_PRICE"
        :max="MAX_PRICE"
        :step="PRICE_STEP"
        :ui="{
          root: 'w-[95%] mx-auto',
        }"
      />
    </template>
  </UCollapsible>
</template>
