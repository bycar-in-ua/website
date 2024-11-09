<script setup lang="ts">
import { inject } from "vue";

import { type IGalleryItem, SetGalleryActiveItemKey, ActiveItemKey } from "./interface.js";

const props = defineProps<{
  item: IGalleryItem;
  index: number;
}>();

const htmlRef = ref<HTMLElement>();

defineExpose({
  htmlRef,
});

const activeItem = inject(ActiveItemKey);
const setGalleryActiveItem = inject(SetGalleryActiveItemKey);

const setActiveItem = () => setGalleryActiveItem?.(props.index);
</script>

<template>
  <div
    ref="htmlRef"
    class="bycar-gallery-thumbnail cursor-pointer rounded-lg overflow-hidden transition-all w-full pt-[63%]"
    :class="activeItem?.currentItemIndex === index ? 'active' : ''"
    :style="{
      'background-image': `url('${item.source}')`,
    }"
    @click="setActiveItem"
  />
</template>

<style>
.bycar-gallery-thumbnail {
  @apply bg-cover bg-center;
  &.active {
    &:after {
      content: "";
      @apply block w-full h-full bg-primary opacity-50;
    }
  }
}
</style>
