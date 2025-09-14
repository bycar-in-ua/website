<script setup lang="ts">
import type { IActiveGalleryItem, IGalleryItem, TSetGalleryActiveItem } from "./interface";
import {
  SetGalleryActiveItemKey,
  ToggleGalleryFullScreenKey,
  ActiveItemKey,
  GalleryItemsKey,
} from "./interface.js";
import ThubmnailsList from "./ThubmnailsList.vue";
import Thumbnail from "./Thumbnail.vue";
import ActiveImage from "./ActiveImage.vue";
import { bodyScrollWatcher } from "~/utils/htmlUtils";

const props = withDefaults(
  defineProps<{
    items: IGalleryItem[];
    height?: string;
    withThumbnials?: boolean;
    fullScreenAvailable?: boolean;
    /**
     * @description Interval in milliseconds
     */
    autoplayInterval?: number;
  }>(),
  {
    height: "auto",
    withThumbnials: true,
    fullScreenAvailable: true,
  },
);

const thumbsListRef = ref<Array<{ htmlRef: HTMLElement; }>>();
const fullScreen = ref<boolean>(false);
const backdropRef = useTemplateRef("backdropRef");

const activeItem = ref<IActiveGalleryItem>({
  currentItemIndex: 0,
  prevItemIndex: null,
  nextItemIndex: props.items.length > 1 ? 1 : null,
});

const setActiveItem: TSetGalleryActiveItem = (
  itemIndex,
  scrollIntoView = true,
) => {
  const prevIndex = itemIndex - 1;
  const nextIndex = itemIndex + 1;
  activeItem.value = {
    currentItemIndex: itemIndex,
    prevItemIndex: prevIndex >= 0 ? prevIndex : null,
    nextItemIndex: nextIndex < props.items.length ? nextIndex : null,
  };
  if (scrollIntoView) {
    thumbsListRef.value?.[itemIndex].htmlRef.scrollIntoView({ block: "nearest" });
  }
};

const toggleFullScreen = (value = !fullScreen.value) => {
  if (!props.fullScreenAvailable) {
    return;
  }

  fullScreen.value = value;

  if (thumbsListRef.value?.length && activeItem.value.currentItemIndex) {
    setTimeout(() => {
      thumbsListRef.value![
        activeItem.value.currentItemIndex
      ].htmlRef.scrollIntoView({ block: "nearest" });
    }, 100);
  }
};

const zoomListener = (e: KeyboardEvent) => {
  if (e.target !== document.body) {
    return;
  }
  e.stopPropagation();

  switch (e.code) {
    case "Escape":
      toggleFullScreen(false);
      break;
    case "KeyF":
      toggleFullScreen();
      break;

    default:
      break;
  }
};

const backdropClickHandler = (e: Event) => {
  if (e.target !== backdropRef.value) {
    return;
  }

  toggleFullScreen(false);
};

provide(SetGalleryActiveItemKey, setActiveItem);
provide(ActiveItemKey, readonly(activeItem));
provide(GalleryItemsKey, props.items);
provide(ToggleGalleryFullScreenKey, toggleFullScreen);

// Autoplay
let intevalId: number | NodeJS.Timeout | undefined;

const autoplayCallback = () => {
  setActiveItem(activeItem.value.nextItemIndex ?? 0, false);
};

const startIntevalHandler = () => {
  if (!props.autoplayInterval) {
    return;
  }

  intevalId = setInterval(autoplayCallback, props.autoplayInterval);
};

const mouseoverHandler = () => {
  clearInterval(intevalId);
  intevalId = undefined;
};

// CLient listeners
if (import.meta.client) {
  onMounted(() => {
    document.addEventListener("keyup", zoomListener);
    startIntevalHandler();
  });
  onBeforeUnmount(() => {
    document.removeEventListener("keyup", zoomListener);
    clearInterval(intevalId);
  });

  watch(fullScreen, bodyScrollWatcher);
}
</script>

<template>
  <div
    ref="backdropRef"
    :class="fullScreen ? 'full-screen' : 'regular-gallery'"
    @click.stop="backdropClickHandler"
    @mouseenter="mouseoverHandler"
    @mouseleave="startIntevalHandler"
  >
    <div
      v-if="fullScreen"
      class="bycar-gallery-icon-container absolute right-2 top-2 md:right-4 md:top-4 cursor-pointer z-30 p-1"
      @click="toggleFullScreen(false)"
    >
      <UIcon
        name="i-heroicons-x-mark"
        class="bycar-gallery-icon w-12 h-12 p-2 bg-white"
      />
    </div>
    <div class="bycar-gallery" :class="{ 'with-thumbnamils': withThumbnials }">
      <ActiveImage
        :is-full-screen="fullScreen"
        :full-screen-available
        class="aspect-[16/10] lg:aspect-auto h-full"
      >
        <template v-if="$slots['active-image-top']" #top>
          <slot name="active-image-top" />
        </template>

        <template v-if="$slots['active-image-bottom']" #bottom>
          <slot name="active-image-bottom" />
        </template>
      </ActiveImage>
      <div
        v-if="withThumbnials || fullScreen"
        class="bycar-gallery-thumnails-list-wrapper"
      >
        <ThubmnailsList>
          <Thumbnail
            v-for="(item, index) in items"
            ref="thumbsListRef"
            :key="item.id"
            :item="item"
            :index="index"
            class="aspect-[16/10] lg:aspect-auto"
          />
        </ThubmnailsList>
      </div>
    </div>
  </div>
</template>

<style>
@reference "~/assets/css/global.css";

.regular-gallery {
  max-height: 95vh;
}
.bycar-gallery.with-thumbnamils {
  @media (min-width: theme(--breakpoint-lg)) {
    grid-template-columns: 1fr 160px;
  }
}

.bycar-gallery {
  @apply grid gap-2 lg:gap-4 overflow-hidden h-full transition-all;
  .bycar-gallery-image-wrapper {
    @apply rounded-2xl;
  }
  .bycar-gallery-thumnails-list-wrapper {
    grid-template-columns: 160px;
    overflow: hidden;
  }
  .bycar-gallery-thumnails-list {
    @apply flex-row overflow-x-auto overflow-y-hidden w-full;
    max-height: 100%;
    @media (min-width: theme(--breakpoint-lg)) {
      @apply flex-col overflow-x-hidden overflow-y-auto h-full;
    }
  }
}
.full-screen {
  @apply fixed bg-gray-900/90 w-full h-full left-0 top-0 right-0 bottom-0 z-40 flex justify-center items-center;
  .bycar-gallery {
    @apply mx-auto p-2 md:p-5 w-full;
    max-height: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 80px;
    @media (min-width: theme(--breakpoint-md)) {
      grid-template-rows: 1fr 110px;
    }
    .bycar-gallery-thumnails-list-wrapper {
      order: unset;
      @apply flex justify-center;
    }
    .bycar-gallery-thumnails-list {
      @apply flex-row overflow-x-auto overflow-y-hidden w-full;
    }
    .bycar-gallery-image-wrapper {
      order: unset;
    }
  }
  .bycar-gallery-image-wrapper {
    @apply rounded-none;
  }
  .bycar-gallery-image {
    @apply object-contain;
  }
}
</style>
