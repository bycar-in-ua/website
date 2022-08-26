<template>
  <div
    class="bycar-gallery-image-wrapper overflow-hidden w-full relative select-none"
  >
    <div
      v-if="item.prevItemIndex !== null"
      class="bycar-gallery-chewron-wrapper left-0"
      @click="setGalleryActiveItem(item.prevItemIndex, 'prev')"
      title='"&#129044;"'
    >
      <ChevronLeftIcon class="bycar-gallery-icon bycar-gallery-chevron" />
    </div>
    <div
      class="flex transition-all h-full"
      :style="{
        transform: `translateX(${itemsTrackTranslate})`,
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
      v-if="item.nextItemIndex !== null"
      class="bycar-gallery-chewron-wrapper right-0"
      @click="setGalleryActiveItem(item.nextItemIndex, 'next')"
      title='"&#10141;"'
    >
      <ChevronRightIcon class="bycar-gallery-icon bycar-gallery-chevron" />
    </div>
    <div class="bycar-gallery-zoom" @click="toggleFullScreen" title='"F"'>
      <ArrowsPointingOutIcon
        class="bycar-gallery-icon bycar-gallery-zoom-icon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  onMounted,
  onBeforeUnmount,
  Ref,
  computed,
} from "vue";
import {
  IActiveGalleryItem,
  IGalleryItem,
  TSetGalleryActiveItem,
  TToggleGalleryFullScreen,
} from "./interface";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "ActiveImage",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    ArrowsPointingOutIcon,
  },
  setup() {
    const item = inject<Ref<IActiveGalleryItem>>("activeItem");
    const setGalleryActiveItem = inject<TSetGalleryActiveItem>(
      "setGalleryActiveItem",
    );
    const toggleFullScreen = inject<TToggleGalleryFullScreen>(
      "toggleGalleryFullScreen",
    );

    const galleryItems = inject<IGalleryItem[]>("galleryItems");

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

    const itemsTrackTranslate = computed(
      () => `-${item.value.currentItemIndex * 100}%`,
    );

    return {
      setGalleryActiveItem,
      item,
      toggleFullScreen,
      galleryItems,
      itemsTrackTranslate,
    };
  },
});
</script>

<style lang="postcss">
.bycar-gallery-chevron {
  @apply h-12  transition-all;
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
  @apply w-12 h-12 absolute right-0 bottom-0 cursor-pointer z-30;
  &:hover {
    .bycar-gallery-zoom-icon {
      @apply opacity-100;
    }
  }
}
.bycar-gallery-zoom-icon {
  @apply transition-all p-2 w-12 h-12;
}
.bycar-gallery-image {
  @apply object-cover w-full h-auto;
  flex: 1 0 100%;
}
</style>
