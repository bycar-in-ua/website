<script setup lang="ts">
import { refWithControl, useDebounceFn } from "@vueuse/core";

const props = defineProps<{
  minLabel?: string;
  maxLabel?: string;
  boundaries?: {
    min?: number;
    max?: number;
  };
  step?: number;
  formatOptions?: Intl.NumberFormatOptions;
}>();

const min = defineModel<number>("min");
const max = defineModel<number>("max");

const debouncedModelUpdate = useDebounceFn((value: number[]) => {
  min.value = value[0];
  if (Number.isFinite(value[1])) {
    max.value = value[1];
  }
}, 500);

const sliderModel = refWithControl([min.value || 0, max.value || props.boundaries?.max || Infinity], { onChanged: debouncedModelUpdate });

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
</script>

<template>
  <div class="flex gap-2 items-center mb-4">
    <div class="grow">
      <slot name="min-price-label">
        <span v-if="minLabel" class="uppercase font-semibold text-sm inline-block mb-1.5">{{ minLabel }}</span>
      </slot>
      <UInputNumber
        v-model="minInputModel"
        :step
        :min="boundaries?.min"
        :max="(boundaries?.max || Infinity) - (step || 0)"
        :placeholder="boundaries?.min?.toString()"
        :format-options
        :increment="false"
        :decrement="false"
        class="w-full"
      />
    </div>
    <div class="grow">
      <slot name="max-price-label">
        <span v-if="maxLabel" class="uppercase font-semibold text-sm inline-block mb-1.5">{{ maxLabel }}</span>
      </slot>
      <UInputNumber
        v-model="maxInputModel"
        :step
        :min="(boundaries?.min || 0) + (step || 0)"
        :max="boundaries?.max"
        :placeholder="boundaries?.max?.toString()"
        :format-options
        :increment="false"
        :decrement="false"
        class="w-full"
      />
    </div>
  </div>

  <USlider
    v-model="sliderModel"
    :min="boundaries?.min"
    :max="boundaries?.max"
    :step
    :ui="{
      root: 'w-[99%] mx-auto',
    }"
  />
</template>
