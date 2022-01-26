<template>
  <Gallery
    :items="galleryItems"
    class="mb-5"
    :mode="GalleryPlacement.vertical"
    height="30vh"
  />
</template>

<script lang="ts">
export default {
  name: "SingleMedia",
};
</script>

<script setup lang="ts">
import { Gallery } from "@/components/common/Gallery";
import { GalleryItem } from "@/components/common/Gallery";
import { GalleryPlacement } from "@/components/common/Gallery/interface";
import tmmImg1 from "@/assets/images/homepage-bg.jpg";
import tmmImg2 from "@/assets/images/test-image-1.jpg";
import tmmImg3 from "@/assets/images/test-image-2.jpg";
import tmmImg4 from "@/assets/images/test-image-3.jpg";
import tmmImg5 from "@/assets/images/test-image-4.jpg";

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    variant: "image",
    source: tmmImg1,
    alt: "Test",
  },
  {
    id: 2,
    variant: "image",
    source: tmmImg2,
  },
  {
    id: 3,
    variant: "image",
    source: tmmImg4,
  },
  {
    id: 4,
    variant: "image",
    source: tmmImg3,
  },
  {
    id: 5,
    variant: "image",
    source: tmmImg5,
  },
  {
    id: 6,
    variant: "image",
    source: tmmImg2,
  },
  {
    id: 7,
    variant: "image",
    source: tmmImg4,
  },
];
</script>
