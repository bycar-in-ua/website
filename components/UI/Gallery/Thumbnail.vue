<template>
  <div
    class="bycar-gallery-thumbnail"
    :class="activeItem.currentItemIndex === index ? 'active' : ''"
    :style="{
      'background-image': `url('${item.source}')`,
    }"
    @click="setActiveItem"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, inject } from "vue";
import {
  IActiveGalleryItem,
  IGalleryItem,
  TSetGalleryActiveItem,
} from "./interface";

export default defineComponent({
  name: "GalleryThumbnail",
  props: {
    item: Object as PropType<IGalleryItem>,
    index: Number as PropType<number>,
  },
  setup(props) {
    const activeItem = inject<IActiveGalleryItem>("activeItem");
    const setGalleryActiveItem = inject<TSetGalleryActiveItem>(
      "setGalleryActiveItem",
    );
    return {
      setActiveItem: () => setGalleryActiveItem(props.index),
      activeItem,
    };
  },
});
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
