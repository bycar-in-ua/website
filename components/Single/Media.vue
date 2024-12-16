<script setup lang="ts">
import { Gallery } from "@/components/UI/Gallery";
import type { IGalleryItem } from "@/components/UI/Gallery";
import type { PowerUnit, Vehicle } from "@bycar-in-ua/sdk";
import ShortSummary from "./ShortSummary.vue";

const props = defineProps<{
  car: Vehicle;
  title: string;
  activePowerUnit?: PowerUnit;
}>();

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
    source: image.path,
    alt: image.alt || props.title,
    provider: "bycar",
  }));
});
</script>

<template>
  <Gallery
    v-if="items.length"
    :items
    class="mb-6 md:mb-10 md:h-[500px] lg:h-[600px]"
  >
    <template #active-image-top>
      <h1
        class="p-4 lg:p-6 text-white font-semibold text-base sm:text-2xl md:text-3xl"
      >
        {{ title }}
      </h1>
    </template>

    <template #active-image-bottom>
      <ShortSummary :car :power-unit="activePowerUnit" />
    </template>
  </Gallery>
</template>
