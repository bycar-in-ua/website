<script setup lang="ts">
import { Gallery } from "@/components/UI/Gallery";
import type { IGalleryItem } from "@/components/UI/Gallery";
import type { Image } from "@bycar-in-ua/sdk";
import { GalleryItemVariant } from "@/components/UI/Gallery/interface";

interface IProps {
  images: Image[];
  feauturedImageId?: number;
}

const props = defineProps<IProps>();

const { $cdnLink } = useNuxtApp();

const items = computed<IGalleryItem[]>(() => {
  const images = props.images;

  const featuredImageIndex = images.findIndex(
    (image) => image.id === props.feauturedImageId,
  );

  if (featuredImageIndex !== -1) {
    const featuredImage = images.splice(featuredImageIndex, 1)[0];
    images.unshift(featuredImage);
  }

  return images.map((image) => ({
    id: image.id as number,
    source: $cdnLink(image.path),
    variant: GalleryItemVariant.image,
  }));
});
</script>

<template>
  <Gallery
    v-if="items.length"
    :items
    class="mb-10"
    height="600px"
  />
</template>
