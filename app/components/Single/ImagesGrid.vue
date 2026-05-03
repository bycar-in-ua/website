<script setup lang="ts">
import FullScreenGallery from "~/components/UI/FullScreenGallery.vue";

const props = defineProps<{ images: VehicleGalleryImage[]; }>();

const cdnImage = useCdnImage();

const overlay = useOverlay();

const lightbox = overlay.create(FullScreenGallery);

const openFullscreen = (startIndex = 0) => {
  lightbox.open({
    images: props.images,
    startIndex,
  });
};
</script>

<template>
  <div class="md:h-screen grid grid-cols-1 md:grid-cols-4 md:gap-2 max-md:border border-gray-200 max-md:divide-y divide-px divide-gray-200 images-grid cursor-zoom-in" @click="openFullscreen()">
    <div
      v-if="images[0]"
      class="md:col-span-4 relative max-md:aspect-video"
    >
      <img
        :src="cdnImage(images[0].src, 'large')"
        :alt="images[0].alt"
        class="object-cover absolute inset-0 w-full h-full"
      >
    </div>

    <div
      v-for="(image, index) in images.slice(1, 5)"
      :key="index"
      class="relative max-md:aspect-video"
    >
      <img
        :src="cdnImage(image.src, 'medium')"
        :alt="image.alt"
        class="object-cover absolute inset-0 w-full h-full cursor-zoom-in"
        @click.stop="openFullscreen(index + 1)"
      >
    </div>
  </div>
</template>

<style>
@reference "../../assets/css/global.css";

@media (min-width: theme(--breakpoint-md)) {
    .images-grid {
        grid-template-rows: 2.65fr 1fr;
    }
}
</style>
