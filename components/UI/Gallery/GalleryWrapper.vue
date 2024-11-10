<script setup lang="ts">
import {
  ref,
  provide,
  readonly,
  onMounted,
  onBeforeUnmount,
} from "vue";
import type { IActiveGalleryItem, IGalleryItem, TSetGalleryActiveItem } from "./interface";
import { SetGalleryActiveItemKey, ToggleGalleryFullScreenKey, ActiveItemKey, GalleryItemsKey } from "./interface.js";
import ThubmnailsList from "./ThubmnailsList.vue";
import Thumbnail from "./Thumbnail.vue";
import ActiveImage from "./ActiveImage.vue";
import { bodyScrollWatcher } from "@/utils/htmlUtils";

const props = withDefaults(
  defineProps<{ items: IGalleryItem[]; height?: string }>(),
  { height: "auto" },
);

const thumbsListRef = ref<Array<{ htmlRef: HTMLElement }>>();
const backdropRef = ref();
const fullScreen = ref<boolean>(false);

const activeItem = ref<IActiveGalleryItem>({
  currentItemIndex: 0,
  prevItemIndex: null,
  nextItemIndex: props.items.length > 1 ? 1 : null,
});

const setActiveItem: TSetGalleryActiveItem = (itemIndex) => {
  const prevIndex = itemIndex - 1;
  const nextIndex = itemIndex + 1;
  activeItem.value = {
    currentItemIndex: itemIndex,
    prevItemIndex: prevIndex >= 0 ? prevIndex : null,
    nextItemIndex: nextIndex < props.items.length ? nextIndex : null,
  };
  thumbsListRef.value?.[itemIndex].htmlRef.scrollIntoView({
    block: "nearest",
  });
};

const toggleFullScreen = (value = !fullScreen.value) => {
  fullScreen.value = value;
};

const zoomListener = (e: KeyboardEvent) => {
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

if (import.meta.client) {
  onMounted(() => {
    document.addEventListener("keyup", zoomListener);
  });
  onBeforeUnmount(() => {
    document.removeEventListener("keyup", zoomListener);
  });

  watch(fullScreen, bodyScrollWatcher);
}

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
</script>

<template>
  <div
    ref="backdropRef"
    :class="fullScreen ? 'full-screen' : 'regular-gallery'"
    :style="`--gallery-height: ${height}`"
    @click.stop="backdropClickHandler"
  >
    <UIcon
      v-if="fullScreen"
      name="i-heroicons-x-mark"
      class="bycar-gallery-icon absolute right-2 top-2 md:right-4 md:top-4 w-12 h-12 p-2 cursor-pointer hover:opacity-100 transition-opacity z-30"
      @click="toggleFullScreen(false)"
    />
    <div class="bycar-gallery">
      <ActiveImage />
      <div class="bycar-gallery-thumnails-list-wrapper">
        <ThubmnailsList>
          <Thumbnail
            v-for="(item, index) in items"
            ref="thumbsListRef"
            :key="item.id"
            :item="item"
            :index="index"
          />
        </ThubmnailsList>
      </div>
    </div>
  </div>
</template>

<style>
.regular-gallery {
  height: auto;
  max-height: 95vh;
  @screen md {
    height: var(--gallery-height);
  }
}
.bycar-gallery {
  @apply grid gap-5 overflow-hidden h-full transition-all;
  @screen md {
    grid-template-columns: 1fr 160px;
    .bycar-gallery-image-wrapper {
      @apply rounded-2xl;
    }
  }
  .bycar-gallery-thumnails-list-wrapper {
    grid-template-columns: 160px;
    overflow: hidden;

  }
  .bycar-gallery-thumnails-list {
    @apply flex-col overflow-x-auto overflow-y-hidden;
    max-height: 100%;
    @screen md {
      @apply grid-flow-row overflow-y-auto overflow-x-hidden;
    }
  }
}
.full-screen {
  @apply fixed bg-gray-900 bg-opacity-90 w-full h-full left-0 top-0 right-0 bottom-0 z-40 flex justify-center items-center;
  .bycar-gallery {
    @apply mx-auto p-2 md:p-5 w-full;
    max-height: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 110px;
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
    @apply w-full rounded-none;
  }
  .bycar-gallery-image {
    @apply object-contain;
  }
}
</style>
