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
import { GalleryItem } from "./interface";

export default defineComponent({
  name: "GalleryThumbnail",
  props: {
    item: Object as PropType<GalleryItem>,
  },
  setup(props) {
    const activeItem = inject<GalleryItem>("activeItem");
    const setGalleryActiveItem = inject<any>("setGalleryActiveItem");
    return {
      setActiveItem: () => setGalleryActiveItem(props.item),
      activeItem,
    };
  },
});
</script>

<style>
.bycar-gallery-thumbnail {
  @apply rounded-lg overflow-hidden w-20 h-20 cursor-pointer transition-all bg-primary;
}
.bycar-gallery-thumbnail.active .bycar-gallery-thumbnail-image {
  @apply opacity-60;
}
.bycar-gallery-thumbnail-image {
  @apply h-full w-full object-cover transition-all;
}
</style>
