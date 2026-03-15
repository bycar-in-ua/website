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
  <div class="h-screen grid grid-cols-4 gap-2 images-grid cursor-zoom-in" @click="openFullscreen()">
    <div
      v-if="images[0]"
      class="col-span-4 relative"
    >
      <img
        :src="cdnImage(images[0].src, 'large')"
        :alt="images[0].alt"
        class="object-cover absolute inset-0 w-full h-full"
      >

      <slot name="overlay" />
    </div>

    <div
      v-for="(image, index) in images.slice(1, 5)"
      :key="index"
      class="relative"
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
.images-grid {
  grid-template-rows: 2.65fr 1fr;
}
</style>
