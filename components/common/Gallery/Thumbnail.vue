<template>
  <div
    class="bycar-gallery-thumbnail"
    @click="setActiveItem"
    :class="activeItem.id === item.id ? 'active' : ''"
  >
    <img
      :src="item.source"
      :alt="item.alt"
      class="bycar-gallery-thumbnail-image"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, inject } from "vue";
import { IGalleryItem, TSetGalleryActiveItem } from "./interface";

export default defineComponent({
  name: "GalleryThumbnail",
  props: {
    item: Object as PropType<IGalleryItem>,
    index: Number as PropType<number>,
  },
  setup(props) {
    const activeItem = inject<IGalleryItem>("activeItem");
    const setGalleryActiveItem = inject<TSetGalleryActiveItem>(
      "setGalleryActiveItem"
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
  @apply rounded-lg overflow-hidden w-20 h-20 cursor-pointer transition-all bg-primary;
  &.active {
    .bycar-gallery-thumbnail-image {
      @apply opacity-60;
    }
  }
}
.bycar-gallery-thumbnail-image {
  @apply h-full w-full object-cover transition-all;
}
</style>
