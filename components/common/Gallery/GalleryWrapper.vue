<template>
  <div
    :style="{
      height: height,
    }"
  >
    <div :class="fullScreen ? 'full-screen' : 'h-full'">
      <div class="bycar-gallery" :class="mode">
        <ThubmnailsList ref="thumbsListRef">
          <Thumbnail
            v-for="(item, index) in items"
            :key="item.id"
            :item="item"
            :index="index"
          />
        </ThubmnailsList>
        <ActiveImage />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  provide,
  readonly,
  onMounted,
  onBeforeUnmount,
} from "vue";
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
    const thumbsListRef = ref(null);
    const fullScreen = ref(false);

    const activeItem: Ref<IActiveGalleryItem> = ref({
      ...props.items[0],
      prevItemIndex: null,
      nextItemIndex: props.items.length > 1 ? 1 : null,
    });

    const scrollDirectionsMap = {
      horizontal: "scrollLeft",
      vertical: "scrollTop",
    };

    const setActiveItem: TSetGalleryActiveItem = (
      itemIndex,
      direction = null
    ) => {
      const prevIndex = itemIndex - 1;
      const nextIndex = itemIndex + 1;
      activeItem.value = {
        ...props.items[itemIndex],
        prevItemIndex: prevIndex >= 0 ? prevIndex : null,
        nextItemIndex: nextIndex < props.items.length ? nextIndex : null,
      };
      switch (direction) {
        case "next":
          thumbsListRef.value.$el[scrollDirectionsMap[props.mode]] += 90;
          break;
        case "prev":
          thumbsListRef.value.$el[scrollDirectionsMap[props.mode]] -= 90;
          break;
        default:
          break;
      }
    };

    const toggleFullScreen = () => {
      fullScreen.value = !fullScreen.value;
    };

    const zoomistener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        fullScreen.value = false;
        return;
      } else if (e.ctrlKey && e.key === "z") {
        fullScreen.value = true;
        return;
      }

      return;
    };

    if (process.client) {
      onMounted(() => {
        document.addEventListener("keyup", zoomistener);
      });
      onBeforeUnmount(() => {
        document.removeEventListener("keyup", zoomistener);
      });
    }

    provide("setGalleryActiveItem", setActiveItem);
    provide("activeItem", readonly(activeItem));
    provide("toggleGalleryFullScreen", toggleFullScreen);

    return {
      activeItem,
      thumbsListRef,
      fullScreen,
    };
  },
});
</script>

<style lang="postcss">
.bycar-gallery {
  @apply grid gap-5 overflow-hidden h-full transition-all;
  grid-template-columns: 80px 1fr;
  .bycar-gallery-thumnails-list {
    @apply grid-flow-row overflow-y-auto overflow-x-hidden;
  }
}
.full-screen {
  @apply fixed bg-gray-900 bg-opacity-50 w-screen h-screen left-0 top-0 right-0 bottom-0 z-40 transition-all flex justify-center items-center;
  .bycar-gallery {
    @apply max-w-7xl mx-auto p-5 w-full;
    max-height: 80%;
  }
  .bycar-gallery-chevron,
  .bycar-gallery-zoom-icon {
    @apply invert-0 text-white;
  }
  .bycar-gallery-image-wrapper {
    @apply w-full;
  }
  .bycar-gallery-image {
    @apply object-contain;
  }
}

.full-screen .bycar-gallery,
.bycar-gallery.horizontal {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 80px;
}
.full-screen .bycar-gallery .bycar-gallery-thumnails-list,
.bycar-gallery.horizontal .bycar-gallery-thumnails-list {
  order: 2;
  @apply grid-flow-col overflow-x-auto overflow-y-hidden;
}
</style>
