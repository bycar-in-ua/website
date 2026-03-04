<script setup lang="ts">
import type { VehicleGalleryImage } from "~/composables/useCarouselGallery";

const props = defineProps<{
  images: VehicleGalleryImage[];
  startIndex: number;
  index: MaybeRef<number>;
  onSelect?: (index: number) => void;
}>();

const currentIndex = computed(() => {
  return typeof props.index === "number" ? props.index + 1 : props.index.value + 1;
});

const cdnImage = useCdnImage();
</script>

<template>
  <UModal
    fullscreen
    :close="{ color: 'secondary', variant: 'ghost' }"
    :ui="{ wrapper: 'dark', content: 'bg-black text-white divide-none', header: 'justify-between', body: 'flex flex-col items-center justify-center' }"
  >
    <template #header="{ close }">
      <span>{{ currentIndex }}/{{ images.length }}</span>
      <UButton
        color="secondary"
        variant="link"
        icon="i-lucide-x"
        size="sm"
        class="dark"
        @click="close"
      />
    </template>

    <template #body>
      <UCarousel
        :items="images"
        :ui="{
          item: 'basis-full',
          container: 'items-stretch',
          prev: 'sm:start-4 top-1/2 -translate-y-1/2 rounded-none bg-white hover:bg-white active:bg-white disabled:opacity-0',
          next: 'sm:end-4 top-1/2 -translate-y-1/2 rounded-none bg-white hover:bg-white active:bg-white disabled:opacity-0',
        }"
        arrows
        :prev="{ color: 'secondary', variant: 'outline', icon: 'i-lucide-chevron-left', size: 'sm' }"
        :next="{ color: 'secondary', variant: 'outline', icon: 'i-lucide-chevron-right', size: 'sm' }"
        :start-index
        @select="onSelect"
      >
        <template #default="{ item }">
          <img
            :src="cdnImage(item.src, 'large')"
            :alt="item.alt || ''"
            loading="lazy"
            class="w-full h-auto max-h-[calc(100vh-8rem)] object-contain"
            :aria-label="item.alt"
          >
        </template>
      </UCarousel>
    </template>
  </UModal>
</template>
