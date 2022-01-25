<template>
  <Gallery :items="galleryItems" class="mb-5" mode="vertical" height="30vh" />
</template>

<script lang="ts">
export default {
  name: "SingleMedia",
};
</script>

<script setup lang="ts">
import { Gallery } from "@/components/common/Gallery";
import { GalleryItem } from "@/components/common/Gallery";

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    variant: "image",
    source: "/assets/images/homepage-bg.jpg",
    alt: "Test",
  },
  {
    id: 2,
    variant: "image",
    source: "/assets/images/test-image-1.jpg",
  },
  {
    id: 3,
    variant: "image",
    source: "/assets/images/test-image-2.jpg",
  },
  {
    id: 4,
    variant: "image",
    source: "/assets/images/test-image-3.jpg",
  },
  {
    id: 5,
    variant: "image",
    source: "/assets/images/test-image-4.jpg",
  },
  {
    id: 6,
    variant: "image",
    source: "/assets/images/test-image-2.jpg",
  },
  {
    id: 7,
    variant: "image",
    source: "/assets/images/test-image-3.jpg",
  },
];
</script>
