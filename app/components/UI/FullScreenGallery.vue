<script setup lang="ts">
import type { VehicleGalleryImage } from "~/composables/useCarouselGallery";

const props = defineProps<{
  images: VehicleGalleryImage[];
  startIndex: number;
  onLeave?: (currentIndex: number) => void;
}>();

const currentIndex = ref(props.startIndex || 0);

const cdnImage = useCdnImage();

const carouselRef = useTemplateRef("carousel");

const focusCarousel = () => {
  // To enable built in arrow navigation
  carouselRef.value?.emblaRef?.closest<HTMLElement>("[tabindex]")?.focus();
};
</script>

<template>
  <UModal
    fullscreen
    :close="{ color: 'secondary', variant: 'ghost' }"
    :ui="{
      wrapper: 'dark',
      content: 'bg-black text-white divide-none',
      header: 'justify-between',
      body: 'flex flex-col items-center justify-center',
    }"
    @after:enter="focusCarousel"
    @after:leave="onLeave?.(currentIndex)"
  >
    <template #header="{ close }">
      <span>{{ currentIndex + 1 }}/{{ images.length }}</span>
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
        ref="carousel"
        :items="images"
        :ui="{
          item: 'basis-full',
          container: 'items-stretch',
          prev: 'sm:inset-s-4 top-1/2 -translate-y-1/2 rounded-none bg-white hover:bg-white active:bg-white disabled:opacity-0',
          next: 'sm:inset-e-4 top-1/2 -translate-y-1/2 rounded-none bg-white hover:bg-white active:bg-white disabled:opacity-0',
        }"
        arrows
        :prev="{ color: 'secondary', variant: 'outline', icon: 'i-lucide-chevron-left', size: 'sm' }"
        :next="{ color: 'secondary', variant: 'outline', icon: 'i-lucide-chevron-right', size: 'sm' }"
        :start-index
        @select="(i) => currentIndex = i"
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
