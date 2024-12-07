<script setup lang="ts">
import Slider from "@/components/UI/Slider.vue";
import Collapsible from "@/components/UI/Collapsible.vue";

const { t } = useI18n();

const priceFrom = defineModel<number>("priceFrom");
const priceTo = defineModel<number>("priceTo");

const updatePriceFrom = (value?: number) => {
  if (typeof value !== "number" || (priceTo.value && value > priceTo.value)) {
    priceFrom.value = 0;
    return;
  }

  priceFrom.value = value > 0 ? value : 0;
};

const updatePriceTo = (value?: number | number) => {
  if (
    typeof value !== "number" ||
    (priceFrom.value && value < priceFrom.value)
  ) {
    priceTo.value = undefined;
    return;
  }

  priceTo.value = value > 0 ? value : 0;
};

const priceSliderModel = computed({
  get: () => [Number(priceFrom.value ?? 0), Number(priceTo.value ?? Infinity)],
  set: ([from, to]: number[]) => {
    updatePriceFrom(from);

    if (isFinite(to)) {
      updatePriceTo(to);
    }
  },
});
</script>

<template>
  <Collapsible :title="t('price')" :default-open="true">
    <template #content>
      <div class="flex gap-2 items-center mb-4 pl-1 pt-1">
        <UInput
          :model-value="priceFrom"
          size="xs"
          type="number"
          :step="1000"
          :min="0"
          :max="200000"
          @update:model-value="updatePriceFrom"
        />
        <span>-</span>
        <UInput
          :model-value="priceTo"
          size="xs"
          type="number"
          :step="1000"
          :min="1000"
          :max="200000"
          @update:model-value="updatePriceTo"
        />
        <span>$</span>
      </div>

      <Slider
        v-model="priceSliderModel"
        :min="0"
        :max="200000"
        :step="1000"
        class="h-3"
      />
    </template>
  </Collapsible>
</template>
