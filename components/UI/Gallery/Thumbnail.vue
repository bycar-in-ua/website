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
    class="bg-cover bg-center cursor-pointer rounded-lg overflow-hidden transition-all w-full pt-[63%] border-2 bg-no-repeat"
    :class="activeItem?.currentItemIndex === index ? 'outline outline-2 -outline-offset-4 outline-white border-primary' : 'border-transparent'"
    :style="{
      'background-image': `url('${item.source}')`,
    }"
    @click="setActiveItem"
  />
</template>
