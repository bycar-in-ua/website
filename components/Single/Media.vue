<template>
  <Gallery
    v-if="galleryItems.length"
    :items="galleryItems"
    class="mb-10"
    height="600px"
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
import type { Image } from "@bycar-in-ua/sdk";
import { GalleryItemVariant } from "@/components/UI/Gallery/interface";

interface IProps {
  images: Image[];
}

const props = defineProps<IProps>();

const { $cdnLink } = useNuxtApp();

const galleryItems = generateGalleryItems(props.images);

function generateGalleryItems(images: Image[]): IGalleryItem[] {
  return images.map((image) => ({
    id: image.id as number,
    source: $cdnLink(image.path),
    variant: GalleryItemVariant.image,
  }));
}
</script>
