<script setup lang="ts">
import { Gallery } from "@/components/UI/Gallery";
import type { IGalleryItem } from "@/components/UI/Gallery";
import type { Vehicle } from "@bycar-in-ua/sdk";
import { GalleryItemVariant } from "@/components/UI/Gallery/interface";
import { getCarTitle } from "@/utils/carHelpers";

const props = defineProps<{ car: Vehicle }>();

const { $cdnLink } = useNuxtApp();

const items = computed<IGalleryItem[]>(() => {
  const images = props.car.images ?? [];

  const featuredImageIndex = images.findIndex(
    (image) => image.id === props.car.featureImage?.id,
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
    height="610px"
  >
    <template #active-image-top>
      <h1 class="p-6 text-white font-semibold text-3xl">
        {{ getCarTitle(car) }}
      </h1>
    </template>
  </Gallery>
</template>
