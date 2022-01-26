<template>
  <div
    class="bycar-regular-gallery"
    :class="mode"
    :style="{
      height: height,
    }"
  >
    <ThubmnailsList>
      <Thumbnail
        v-for="(item, index) in items"
        :key="item.id"
        :item="item"
        :index="index"
      />
    </ThubmnailsList>
    <ActiveImage />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, provide, readonly } from "vue";
import {
  GalleryProps,
  IActiveGalleryItem,
  TSetGalleryActiveItem,
} from "./interface";
import ThubmnailsList from "./ThubmnailsList.vue";
import Thumbnail from "./Thumbnail.vue";
import ActiveImage from "./ActiveImage.vue";

export default defineComponent({
  name: "Gallery",
  props: GalleryProps,
  components: { ThubmnailsList, Thumbnail, ActiveImage },
  setup(props) {
    const activeItem: Ref<IActiveGalleryItem> = ref({
      ...props.items[0],
      prevItemIndex: null,
      nextItemIndex: props.items.length > 1 ? 1 : null,
    });

    const setActiveItem: TSetGalleryActiveItem = (itemIndex) => {
      const prevIndex = itemIndex - 1;
      const nextIndex = itemIndex + 1;
      activeItem.value = {
        ...props.items[itemIndex],
        prevItemIndex: prevIndex >= 0 ? prevIndex : null,
        nextItemIndex: nextIndex < props.items.length ? nextIndex : null,
      };
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
