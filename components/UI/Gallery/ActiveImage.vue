<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount, computed } from "vue";
import {
  SetGalleryActiveItemKey,
  ToggleGalleryFullScreenKey,
  ActiveItemKey,
  GalleryItemsKey,
} from "./interface.js";

defineProps<{ isFullScreen: boolean; fullScreenAvailable: boolean }>();

const trackRef = ref<HTMLElement>();
const transitionDuration = ref<number>(300);

const activeItem = inject(ActiveItemKey);
const setGalleryActiveItem = inject(SetGalleryActiveItemKey);
const toggleFullScreen = inject(ToggleGalleryFullScreenKey);

const galleryItems = inject(GalleryItemsKey);

const arrowsKeydownListener = (e: KeyboardEvent) => {
  if (!activeItem) {
    return;
  }
  e.stopPropagation();

  if (e.key === "ArrowRight" && activeItem.value.nextItemIndex !== null) {
    setGalleryActiveItem?.(activeItem.value.nextItemIndex);
    return;
  } else if (e.key === "ArrowLeft" && activeItem.value.prevItemIndex !== null) {
    setGalleryActiveItem?.(activeItem.value.prevItemIndex);
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
    if (!activeItem) {
      return;
    }

    transitionDuration.value = 300;
    switch (direction) {
      case SwipeDirection.RIGHT:
        if (activeItem.value.prevItemIndex != null) {
          setGalleryActiveItem?.(activeItem.value.prevItemIndex);
        }
        break;

      case SwipeDirection.LEFT:
        if (activeItem.value.nextItemIndex != null) {
          setGalleryActiveItem?.(activeItem.value.nextItemIndex);
        }
        break;
      default:
        break;
    }
  },
});

const itemsTrackTranslate = computed(
  () =>
    `calc(-${Number(activeItem?.value.currentItemIndex ?? 0) * 100}% - ${
      lengthX.value
    }px)`,
);
</script>

<template>
  <div
    class="bycar-gallery-image-wrapper overflow-hidden w-full relative select-none"
  >
    <div
      v-if="activeItem?.prevItemIndex !== null"
      title="&#129044;"
      class="bycar-gallery-chewron-wrapper justify-end left-0"
      @click="setGalleryActiveItem(activeItem?.prevItemIndex ?? 0)"
    >
      <span class="bycar-gallery-icon-container">
        <UIcon
          name="i-heroicons-chevron-left"
          class="bycar-gallery-icon bycar-gallery-chevron"
        />
      </span>
    </div>

    <template v-if="!isFullScreen">
      <div
        v-if="$slots.top"
        class="absolute top-0 left-0 right-0 min-h-44 z-10 bg-gradient-to-b from-zinc-700/80 to-zinc-600/0"
      >
        <slot name="top" />
      </div>

      <div
        v-if="fullScreenAvailable"
        class="absolute top-0 left-14 right-14 cursor-pointer z-20"
        :class="$slots.bottom ? 'bottom-16' : 'bottom-0'"
        :title="$t('gallery.toggleFullScreen')"
        @click="() => toggleFullScreen?.()"
      />

      <div
        v-if="$slots.bottom"
        class="absolute bottom-0 left-0 right-0 min-h-44 z-10 bg-gradient-to-t from-zinc-700/80 to-zinc-600/0 flex flex-col justify-end overflow-y-auto no-scrollbar"
      >
        <slot name="bottom" />
      </div>
    </template>

    <div
      ref="trackRef"
      class="flex h-full"
      :style="{
        transform: `translateX(${itemsTrackTranslate})`,
        transitionDuration: `${transitionDuration}ms`,
      }"
    >
      <CdnImage
        v-for="item in galleryItems"
        :key="item.id"
        :src="item.source"
        :alt="item.alt"
        :size="isFullScreen ? 'large' : 'medium'"
        :densities="
          isFullScreen ? ['large:1x', 'large:2x'] : ['medium:1x', 'large:2x']
        "
        class="bycar-gallery-image"
      />
    </div>

    <div
      v-if="activeItem?.nextItemIndex !== null"
      title="&#10141;"
      class="bycar-gallery-chewron-wrapper justify-start right-0"
      @click="setGalleryActiveItem(activeItem?.nextItemIndex ?? 0)"
    >
      <span class="bycar-gallery-icon-container">
        <UIcon
          name="i-heroicons-chevron-right"
          class="bycar-gallery-icon bycar-gallery-chevron"
        />
      </span>
    </div>
  </div>
</template>

<style>
@reference "@/assets/css/global.css";

.bycar-gallery-icon {
  @apply h-8 w-8 md:h-12 md:w-12;
}

.bycar-gallery-chevron {
  @apply w-5 h-5 bg-white;
}

.bycar-gallery-icon-container {
  @apply bg-slate-900/60 transition-all rounded-full h-8 w-8 inline-flex items-center justify-center;
}

.bycar-gallery-chewron-wrapper {
  @apply absolute top-1/4 h-1/2 w-14 flex items-center cursor-pointer transition-all z-20;
  &:hover {
    .bycar-gallery-icon-container {
      @apply bg-slate-900/80;
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
.bycar-gallery-track {
  transform: translate3d(var(--x-translate), 0, 0);
}
</style>
