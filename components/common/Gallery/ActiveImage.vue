<template>
  <div
    class="bycar-gallery-image-wrapper overflow-hidden rounded-lg w-full relative select-none"
  >
    <div
      v-if="item.prevItemIndex !== null"
      class="bycar-gallery-chewron-wrapper left-0 hover:bg-gradient-to-l"
      @click="setGalleryActiveItem(item.prevItemIndex, 'prev')"
    >
      <ChevronLeftIcon class="bycar-gallery-chevron" />
    </div>
    <img :src="item.source" :alt="item.alt" class="bycar-gallery-image" />
    <div
      v-if="item.nextItemIndex !== null"
      class="bycar-gallery-chewron-wrapper right-0 hover:bg-gradient-to-r"
      @click="setGalleryActiveItem(item.nextItemIndex, 'next')"
    >
      <ChevronRightIcon class="bycar-gallery-chevron" />
    </div>
    <div class="bycar-gallery-zoom" @click="toggleFullScreen">
      <ArrowsExpandIcon class="bycar-gallery-zoom-icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onBeforeUnmount, Ref } from "vue";
import {
  IActiveGalleryItem,
  TSetGalleryActiveItem,
  TToggleGalleryFullScreen,
} from "./interface";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowsExpandIcon,
} from "@heroicons/vue/solid";

export default defineComponent({
  name: "ActiveImage",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    ArrowsExpandIcon,
  },
  setup() {
    const item = inject<Ref<IActiveGalleryItem>>("activeItem");
    const setGalleryActiveItem = inject<TSetGalleryActiveItem>(
      "setGalleryActiveItem"
    );
    const toggleFullScreen = inject<TToggleGalleryFullScreen>(
      "toggleGalleryFullScreen"
    );

    const arrowsKeydownListener = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && item.value.nextItemIndex !== null) {
        setGalleryActiveItem(item.value.nextItemIndex, "next");
        return;
      } else if (e.key === "ArrowLeft" && item.value.prevItemIndex !== null) {
        setGalleryActiveItem(item.value.prevItemIndex, "prev");
        return;
      }

      return;
    };

    if (process.client) {
      onMounted(() => {
        document.addEventListener("keyup", arrowsKeydownListener);
      });
      onBeforeUnmount(() => {
        document.removeEventListener("keyup", arrowsKeydownListener);
      });
    }

    return {
      setGalleryActiveItem,
      item,
      toggleFullScreen,
    };
  },
});
</script>

<style lang="postcss">
.bycar-gallery-chevron {
  @apply h-12 opacity-50 invert transition-all;
  --tw-invert: invert(50%);
}
.bycar-gallery-chewron-wrapper {
  @apply absolute top-0 bottom-0 flex items-center justify-center cursor-pointer transition-all;
  --tw-gradient-stops: transparent, rgba(255, 255, 255, 0.2);
  &:hover {
    .bycar-gallery-chevron {
      @apply opacity-100;
    }
  }
}
.bycar-gallery-zoom {
  @apply absolute right-0 bottom-0 p-4 cursor-pointer;
  &:hover {
    .bycar-gallery-zoom-icon {
      @apply opacity-100;
    }
  }
}
.bycar-gallery-zoom-icon {
  @apply w-8 h-8 invert opacity-50 transition-all;
  --tw-invert: invert(50%);
}
.bycar-gallery-image {
  @apply object-cover w-full h-full;
}
</style>
