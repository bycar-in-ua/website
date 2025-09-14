<script setup lang="ts">
import { Gallery } from "~/components/UI/Gallery";
import type { IGalleryItem } from "~/components/UI/Gallery";
import type { PowerUnit, Vehicle } from "@bycar-in-ua/sdk";
import ShortSummary from "./ShortSummary.vue";

const props = defineProps<{
  car: Vehicle;
  title: string;
  activePowerUnit?: PowerUnit;
}>();

const items = computed<IGalleryItem[]>(() => {
  const images = props.car.images ?? [];

  return images.map(({ imageId, image }) => ({
    id: imageId,
    source: image!.path,
    alt: image?.alt || props.title,
    provider: "bycar",
  }));
});
</script>

<template>
  <Gallery
    v-if="items.length"
    :items
    class="mb-6 md:mb-10 lg:h-[600px]"
  >
    <template #active-image-top>
      <h2
        class="p-4 lg:p-6 text-white font-semibold text-base sm:text-2xl md:text-3xl"
      >
        {{ title }}
      </h2>
    </template>

    <template #active-image-bottom>
      <ShortSummary :car :power-unit="activePowerUnit" />
    </template>
  </Gallery>
</template>
