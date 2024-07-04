<template>
  <Gallery
    v-if="galleryItems.length"
    :items="galleryItems"
    class="mb-5"
    height="510px"
  />
</template>

<script lang="ts">
export default {
  name: "SingleMedia",
};
</script>

<script setup lang="ts">
import { Gallery } from "@/components/UI/Gallery";
import type { IGalleryItem } from "@/components/UI/Gallery";
import type { ImageDto as CarImage } from "@bycar-in-ua/common";
import { GalleryItemVariant } from "@/components/UI/Gallery/interface";

interface IProps {
  images: CarImage[];
}

const props = defineProps<IProps>();

const { $cdnLink } = useNuxtApp();

const galleryItems = generateGalleryItems(props.images);

function generateGalleryItems(images: CarImage[]): IGalleryItem[] {
  return images.map((image) => ({
    id: image.id as number,
    source: $cdnLink(image.path),
    variant: GalleryItemVariant.image,
  }));
}
</script>
