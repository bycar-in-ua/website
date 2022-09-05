<template>
  <div
    :class="fullScreen ? 'full-screen' : 'regular-gallery'"
    :style="`--gallery-height: ${height}`"
    ref="backdropRef"
    @click.stop="backdropClickHandler"
  >
    <XMarkIcon
      v-if="fullScreen"
      class="bycar-gallery-icon absolute right-2 top-2 md:right-4 md:top-4 w-12 h-12 p-2 cursor-pointer hover:opacity-100 transition-opacity z-30"
      @click="fullScreen = false"
    />
    <div class="bycar-gallery">
      <ActiveImage />
      <div class="bycar-gallery-thumnails-list-wrapper">
        <ThubmnailsList>
          <Thumbnail
            v-for="(item, index) in items"
            :key="item.id"
            :item="item"
            :index="index"
            ref="thumbsListRef"
          />
        </ThubmnailsList>
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
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { bodyScrollWatcher } from "@/utils/htmlUtils";

export default defineComponent({
  name: "Gallery",
  props: GalleryProps,
  components: { ThubmnailsList, Thumbnail, ActiveImage, XMarkIcon },
  setup(props) {
    const thumbsListRef = ref<Array<{ htmlRef: HTMLElement }>>();
    const backdropRef = ref();
    const fullScreen = ref<boolean>(false);

    const activeItem: Ref<IActiveGalleryItem> = ref({
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
      thumbsListRef.value[itemIndex].htmlRef.scrollIntoView({
        block: "nearest",
      });
    };

    const toggleFullScreen = () => {
      fullScreen.value = !fullScreen.value;
    };

    const zoomistener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        fullScreen.value = false;
        return;
      } else if (e.key === "f") {
        toggleFullScreen();
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

      watch(fullScreen, bodyScrollWatcher);
    }

    const backdropClickHandler = (e) => {
      if (e.target !== backdropRef.value) {
        return;
      }
      fullScreen.value = false;
      return;
    };

    provide("setGalleryActiveItem", setActiveItem);
    provide("activeItem", readonly(activeItem));
    provide("galleryItems", props.items);
    provide("toggleGalleryFullScreen", toggleFullScreen);

    return {
      activeItem,
      thumbsListRef,
      backdropRef,
      fullScreen,
      backdropClickHandler,
    };
  },
});
</script>

<style lang="postcss">
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
    grid-template-columns: 80px 1fr;
    .bycar-gallery-image-wrapper {
      @apply rounded-lg;
      order: 2;
    }
  }
  .bycar-gallery-thumnails-list-wrapper {
    grid-template-columns: 80px;
    overflow: hidden;
    @screen md {
      order: 1;
    }
  }
  .bycar-gallery-thumnails-list {
    @apply grid-flow-col overflow-x-auto overflow-y-hidden;
    max-height: 100%;
    @screen md {
      @apply grid-flow-row overflow-y-auto overflow-x-hidden;
    }
  }
}
.full-screen {
  @apply fixed bg-gray-900 bg-opacity-90 w-screen h-screen left-0 top-0 right-0 bottom-0 z-40 flex justify-center items-center;
  .bycar-gallery {
    @apply mx-auto p-2 md:p-5 w-full;
    max-height: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 80px;
    .bycar-gallery-thumnails-list-wrapper {
      order: unset;
      @apply flex justify-center;
    }
    .bycar-gallery-thumnails-list {
      @apply grid-flow-col overflow-x-auto
        overflow-y-hidden;
    }
    .bycar-gallery-image-wrapper {
      order: unset;
    }
  }
  .bycar-gallery-chevron,
  .bycar-gallery-zoom-icon {
    @apply invert-0 text-white;
  }
  .bycar-gallery-image-wrapper {
    @apply w-full rounded-none;
  }
  .bycar-gallery-image {
    @apply object-contain;
  }
}

.bycar-gallery-icon {
  @apply opacity-70;
  background: rgba(0, 0, 0, 0.6);
  fill: rgba(255, 255, 255, 0.65);
}
</style>
