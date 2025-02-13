<script setup lang="ts">
import { Gallery, type IGalleryItem } from "@/components/UI/Gallery";
import type { AvailableCar } from "./interface";
import { getPriceRange } from "../UI/CarCard/helpers";

const props = defineProps<{ car: AvailableCar | null }>();

const open = defineModel<boolean>("open");

const priceRange = computed(() => getPriceRange(props.car?.complectations));

const img = useCdnImage();

const galleryItems = computed<IGalleryItem[]>(() => {
  if (!props.car) {
    return [];
  }

  return props.car.availability.images.map((image) => ({
    id: image.id,
    source: img(image.path, "large"),
  }));
});
</script>

<template>
  <UModal v-model="open" :ui="{ width: 'lg:max-w-[75vw]' }">
    <UCard v-if="car">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6">
            {{ car.title }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="open = false"
          />
        </div>
      </template>

      <div class="flex flex-col lg:flex-row gap-4 sm:gap-8">
        <div class="basis-2/3 flex-shrink-0">
          <Gallery
            :items="galleryItems"
            :full-screen-available="false"
            :autoplay-interval="5_000"
          />
        </div>

        <div>
          <h2 class="text-xl sm:text-2xl font-bold">
            Новий {{ car.title }} в наявності за ціною {{ priceRange }}
          </h2>
        </div>
      </div>
    </UCard>
  </UModal>
</template>
