<template>
  <div
    class="bycar-gallery-thumbnail"
    :class="activeItem.currentItemIndex === index ? 'active' : ''"
    :style="{
      'background-image': `url('${item.source}')`,
    }"
    @click="setActiveItem"
    ref="htmlRef"
  />
</template>

<script lang="ts">
export default defineComponent({
  name: "GalleryThumbnail",
});
</script>

<script setup lang="ts">
import { defineComponent, inject } from "vue";
import {
  IActiveGalleryItem,
  IGalleryItem,
  TSetGalleryActiveItem,
} from "./interface";

const props = defineProps<{
  item: IGalleryItem;
  index: number;
}>();

const htmlRef = ref<HTMLElement>();

defineExpose({
  htmlRef,
});

const activeItem = inject<IActiveGalleryItem>("activeItem");
const setGalleryActiveItem = inject<TSetGalleryActiveItem>(
  "setGalleryActiveItem",
);

const setActiveItem = () => setGalleryActiveItem(props.index);
</script>

<style lang="postcss">
.bycar-gallery-thumbnail {
  @apply rounded-lg overflow-hidden w-20 h-20 cursor-pointer transition-all bg-cover bg-center;
  &.active {
    &:after {
      content: "";
      @apply block w-full h-full bg-primary opacity-50;
    }
  }
}
</style>
