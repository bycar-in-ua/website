<script setup lang="ts">
import type { BodyTypeOption } from "../quiz.types";

defineProps<{
  checked?: boolean;
  option: BodyTypeOption;
}>();
</script>

<template>
  <div class="ring group cursor-pointer relative" :class="`${checked ? 'ring-primary' : 'ring-gray-100 hover:ring-primary'}`">
    <div
      class="aspect-video body-type-card-image bg-cover bg-no-repeat bg-center"
      :style="{
        '--bg-image': `url(${option.image})`,
        '--hover-bg-image': `url(${option.hoverImage})`,
      }"
    />

    <UCheckbox
      :model-value="checked"
      class="absolute top-2 right-2"
      :class="`${checked ? '' : 'opacity-0'}`"
    />

    <div class="px-4 pb-3">
      <h4 class="font-bold mb-0.5">
        {{ option.label }}
      </h4>
      <p class="text-xs text-dimmed">
        {{ option.subtitle }}
      </p>
    </div>
  </div>
</template>
