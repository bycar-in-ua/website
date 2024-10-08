<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount, type Ref, computed } from "vue";
import type {
  IActiveGalleryItem,
  IGalleryItem,
  TSetGalleryActiveItem,
  TToggleGalleryFullScreen,
} from "./interface";

const trackRef = ref<HTMLElement>();
const transitionDuration = ref<number>(300);

const activeItem = inject<Ref<IActiveGalleryItem>>("activeItem");
const setGalleryActiveItem = inject<TSetGalleryActiveItem>(
  "setGalleryActiveItem",
);
const toggleFullScreen = inject<TToggleGalleryFullScreen>(
  "toggleGalleryFullScreen",
);

const galleryItems = inject<IGalleryItem[]>("galleryItems");

const arrowsKeydownListener = (e: KeyboardEvent) => {
  if (e.key === "ArrowRight" && activeItem.value.nextItemIndex !== null) {
    setGalleryActiveItem(activeItem.value.nextItemIndex, "next");
    return;
  } else if (e.key === "ArrowLeft" && activeItem.value.prevItemIndex !== null) {
    setGalleryActiveItem(activeItem.value.prevItemIndex, "prev");
    return;
  }

  return;
};

if (import.meta.client) {
  onMounted(() => {
    document.addEventListener("keyup", arrowsKeydownListener);
  });
  onBeforeUnmount(() => {
    document.removeEventListener("keyup", arrowsKeydownListener);
    stop();
  });
}

const { lengthX, stop } = useSwipe(trackRef, {
  threshold: 100,
  onSwipeStart: () => {
    transitionDuration.value = 0;
  },
  onSwipeEnd: (e, direction) => {
    transitionDuration.value = 300;
    switch (direction) {
      case SwipeDirection.RIGHT:
        activeItem.value.prevItemIndex != null &&
          setGalleryActiveItem(activeItem.value.prevItemIndex);
        break;

      case SwipeDirection.LEFT:
        activeItem.value.nextItemIndex != null &&
          setGalleryActiveItem(activeItem.value.nextItemIndex);
        break;
      default:
        break;
    }
  },
});

const itemsTrackTranslate = computed(
  () =>
    `calc(-${+activeItem.value.currentItemIndex * 100}% - ${lengthX.value}px)`,
);
</script>

<template>
  <div
    class="bycar-gallery-image-wrapper overflow-hidden w-full relative select-none"
  >
    <div
      v-if="activeItem.prevItemIndex !== null"
      class="bycar-gallery-chewron-wrapper left-0"
      title='"&#129044;"'
      @click="setGalleryActiveItem(activeItem.prevItemIndex, 'prev')"
    >
      <UIcon
        name="i-heroicons-chevron-left"
        class="bycar-gallery-icon bycar-gallery-chevron"
      />
    </div>
    <div
      ref="trackRef"
      class="flex h-full"
      :style="{
        transform: `translateX(${itemsTrackTranslate})`,
        transitionDuration: `${transitionDuration}ms`,
      }"
    >
      <img
        v-for="item in galleryItems"
        :key="item.id"
        :src="item.source"
        :alt="item.alt"
        class="bycar-gallery-image"
      />
    </div>
    <div
      v-if="activeItem.nextItemIndex !== null"
      class="bycar-gallery-chewron-wrapper right-0"
      title='"&#10141;"'
      @click="setGalleryActiveItem(activeItem.nextItemIndex, 'next')"
    >
      <UIcon
        name="i-heroicons-chevron-right"
        class="bycar-gallery-icon bycar-gallery-chevron"
      />
    </div>
    <div class="bycar-gallery-zoom" title="F" @click="toggleFullScreen">
      <UIcon
        name="i-heroicons-arrows-pointing-out"
        class="bycar-gallery-icon bycar-gallery-zoom-icon"
      />
    </div>
  </div>
</template>

<style lang="postcss">
.bycar-gallery-icon {
  @apply h-8 w-8 md:h-12 md:w-12;
}
.bycar-gallery-chevron {
  @apply transition-all;
}
.bycar-gallery-chewron-wrapper {
  @apply absolute top-0 bottom-0 flex items-center justify-center cursor-pointer transition-all z-20;
  --tw-gradient-stops: transparent, rgba(255, 255, 255, 0.2);
  &:hover {
    .bycar-gallery-chevron {
      @apply opacity-100;
    }
  }
}
.bycar-gallery-zoom {
  @apply absolute right-0 bottom-0 cursor-pointer z-30;
  &:hover {
    .bycar-gallery-zoom-icon {
      @apply opacity-100;
    }
  }
}
.bycar-gallery-zoom-icon {
  @apply transition-all p-2;
}
.bycar-gallery-image {
  @apply object-cover w-full h-auto;
  flex: 1 0 100%;
}
/* .bycar-gallery-track {
  transform: translate3d(var(--x-translate), 0, 0);
} */
</style>
