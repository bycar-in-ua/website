<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "radix-vue";

const model = defineModel<number[]>();

withDefaults(defineProps<{ min?: number; max?: number; step?: number }>(), {
  min: 0,
  max: 100,
  step: 1,
});
</script>

<template>
  <SliderRoot
    v-model="model"
    class="slider-root"
    :min
    :max
    :step
  >
    <SliderTrack class="slider-track">
      <SliderRange class="slider-range" />
    </SliderTrack>
    <SliderThumb v-for="i in model?.length" :key="i" class="slider-thumb" />
  </SliderRoot>
</template>

<style>
.slider-root {
  position: relative;
  display: flex;
  align-items: center;
  --slider-track-size: 4px;
}
.slider-root[data-orientation="vertical"] {
  flex-direction: column;
  width: 20px;
  height: 100px;
}

.slider-track {
  flex-grow: 1;
  @apply rounded-lg bg-gray-200 relative;
}
.slider-track[data-orientation="horizontal"],
.slider-range[data-orientation="horizontal"] {
  height: var(--slider-track-size, 4px);
}
.slider-track[data-orientation="vertical"],
.slider-range[data-orientation="vertical"] {
  width: var(--slider-track-size, 4px);
}

.slider-range {
  @apply absolute bg-primary rounded-lg;
}

.slider-thumb {
  @apply block w-3 h-3 bg-white rounded-full border-2 border-primary cursor-pointer;
}
</style>
