<script setup lang="ts">
defineProps<{ images: VehicleGalleryImage[]; }>();

const cdnImage = useCdnImage();
</script>

<template>
  <div class="h-screen grid grid-cols-4 gap-2 images-grid">
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
        class="object-cover absolute inset-0 w-full h-full"
      >
    </div>
  </div>
</template>

<style>
.images-grid {
  grid-template-rows: 2.65fr 1fr;
}
</style>
