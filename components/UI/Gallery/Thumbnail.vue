<script setup lang="ts">
import { inject } from "vue";

import {
  type IGalleryItem,
  SetGalleryActiveItemKey,
  ActiveItemKey,
} from "./interface.js";

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
    class="bycar-gallery-thumbnail"
    :class="
      activeItem?.currentItemIndex === index
        ? 'outline-primary'
        : 'outline-transparent'
    "
    @click="setActiveItem"
  >
    <img :src="item.source" class="w-full h-full object-cover" />
  </div>
</template>

<style>
.bycar-gallery-thumbnail {
  @apply bg-cover bg-center cursor-pointer rounded-xl overflow-hidden transition-all w-full border-4 border-transparent outline outline-2 -outline-offset-2;
}

.full-screen .bycar-gallery-thumbnail {
  flex: 110px 0 0;
  @screen md {
    flex: 170px 0 0;
  }
}

.regular-gallery .bycar-gallery-thumbnail {
  flex: 90px 0 0;
  @screen md {
    flex: 110px 0 0;
  }
}
</style>
