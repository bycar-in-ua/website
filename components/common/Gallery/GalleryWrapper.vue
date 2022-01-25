<template>
  <div
    class="bycar-regular-gallery"
    :class="mode"
    :style="{
      height: height,
    }"
  >
    <ThubmnailsList>
      <Thumbnail v-for="item in items" :key="item.id" :item="item" />
    </ThubmnailsList>
    <ActiveImage :item="activeItem" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, readonly } from "vue";
import { GalleryProps, GalleryItem } from "./interface";
import ThubmnailsList from "./ThubmnailsList.vue";
import Thumbnail from "./Thumbnail.vue";
import ActiveImage from "./ActiveImage.vue";

export default defineComponent({
  name: "Gallery",
  props: GalleryProps,
  components: { ThubmnailsList, Thumbnail, ActiveImage },
  setup(props) {
    const activeItem = ref(props.items[0]);

    const setActiveItem = (item: GalleryItem): void => {
      activeItem.value = item;
    };

    provide("setGalleryActiveItem", setActiveItem);
    provide("activeItem", readonly(activeItem));

    return {
      activeItem,
    };
  },
});
</script>

<style>
.bycar-regular-gallery {
  @apply grid gap-5 overflow-hidden;
  grid-template-columns: 80px 1fr;
}
.bycar-regular-gallery .bycar-gallery-thumnails-list {
  @apply grid-flow-row overflow-y-auto overflow-x-hidden;
}
.bycar-regular-gallery.horizontal {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 80px;
}
.bycar-regular-gallery.horizontal .bycar-gallery-thumnails-list {
  order: 2;
  @apply grid-flow-col overflow-x-auto overflow-y-hidden;
}
</style>
