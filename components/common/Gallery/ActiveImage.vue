<template>
  <div class="overflow-hidden rounded-lg w-full relative">
    <div
      v-if="item.prevItemIndex !== null"
      class="bycar-gallery-chewron-wrapper left-0 hover:bg-gradient-to-l"
      @click="setGalleryActiveItem(item.prevItemIndex)"
    >
      <ChevronLeftIcon class="bycar-gallery-chevron" />
    </div>
    <img
      :src="item.source"
      :alt="item.alt"
      class="object-cover w-full h-full"
    />
    <div
      v-if="item.nextItemIndex !== null"
      class="bycar-gallery-chewron-wrapper right-0 hover:bg-gradient-to-r"
      @click="setGalleryActiveItem(item.nextItemIndex)"
    >
      <ChevronRightIcon class="bycar-gallery-chevron" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { IActiveGalleryItem, TSetGalleryActiveItem } from "./interface";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";

export default defineComponent({
  name: "ActiveImage",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  setup() {
    const item = inject<IActiveGalleryItem>("activeItem");
    const setGalleryActiveItem = inject<TSetGalleryActiveItem>(
      "setGalleryActiveItem"
    );

    return {
      setGalleryActiveItem,
      item,
    };
  },
});
</script>

<style>
.bycar-gallery-chevron {
  @apply h-12 opacity-50 invert transition-all;
  --tw-invert: invert(50%);
}
.bycar-gallery-chewron-wrapper {
  @apply absolute top-0 bottom-0 flex items-center justify-center cursor-pointer transition-all;
  --tw-gradient-stops: transparent, rgba(255, 255, 255, 0.2);
}
.bycar-gallery-chewron-wrapper:hover .bycar-gallery-chevron {
  @apply opacity-100;
}
</style>
