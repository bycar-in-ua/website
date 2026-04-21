<script setup lang="ts">
import { type VehicleGalleryImage, useCarouselGallery } from "~/composables/useCarouselGallery";
import FullScreenGallery from "~/components/UI/FullScreenGallery.vue";

const props = withDefaults(defineProps<{
  images: VehicleGalleryImage[];
  isAvailableNow?: boolean;
}>(), { isAvailableNow: false });

const cdnImage = useCdnImage();

const mainCarousel = useTemplateRef("mainCarousel");
const thumbCarousel = useTemplateRef("thumbCarousel");

onMounted(() => {
  // To enable built in arrow navigation
  mainCarousel.value?.emblaRef?.closest<HTMLElement>("[tabindex]")?.focus();
});

const {
  currentIndex, hasImages, scrollTo,
} = useCarouselGallery({
  images: props.images,
  mainCarousel,
  thumbCarousel,
});

const overlay = useOverlay();

const lightbox = overlay.create(FullScreenGallery);

const openFullscreen = () => {
  lightbox.open({
    images: props.images,
    startIndex: currentIndex.value,
    onLeave: (index) => scrollTo(index, true),
  });
};
</script>

<template>
  <section v-if="hasImages">
    <div class="relative group" data-testid="vehicle-gallery">
      <UBadge
        v-if="isAvailableNow"
        icon="i-lucide-clock-3"
        label="Доступно зараз"
        variant="solid"
        class="absolute left-4 top-4 z-10"
      />

      <UCarousel
        ref="mainCarousel"
        :items="images"
        :ui="{
          item: 'basis-full',
          container: 'items-stretch',
          arrows: 'hidden lg:block',
          prev: 'sm:inset-s-4 top-1/2 -translate-y-1/2 rounded-none bg-white hover:bg-white active:bg-white disabled:opacity-0',
          next: 'sm:inset-e-4 top-1/2 -translate-y-1/2 rounded-none bg-white hover:bg-white active:bg-white disabled:opacity-0',
        }"
        arrows
        :prev="{ color: 'secondary', variant: 'outline', icon: 'i-lucide-chevron-left', size: 'sm' }"
        :next="{ color: 'secondary', variant: 'outline', icon: 'i-lucide-chevron-right', size: 'sm' }"
        class="rounded-none overflow-hidden"
        @keydown="() => {}"
      >
        <template #default="{ item, index }">
          <img
            :src="cdnImage(item.src, index === 0 ? 'large' : 'medium')"
            :alt="item.alt || ''"
            loading="lazy"
            class="w-full aspect-video object-cover cursor-zoom-in border border-gray-200"
            :aria-label="item.alt || 'Відкрити зображення у повноекранному режимі'"
            @click="openFullscreen"
          >
        </template>
      </UCarousel>
    </div>

    <UCarousel
      v-if="images.length"
      ref="thumbCarousel"
      :items="images"
      :ui="{
        container: '-ms-2',
        item: 'basis-1/4 min-w-0 ps-2',
      }"
      class="mt-2"
      :options="{
        align: 'start',
        dragFree: true,
      }"
    >
      <template #default="{ item, index }">
        <img
          :src="cdnImage(item.src, 'thumbnail')"
          :alt="item.alt || ''"
          loading="lazy"
          :aria-label="`Перейти до зображення ${index + 1}`"
          class="w-full h-20 md:h-24 object-cover border"
          :class="currentIndex === index ? 'border-gray-500': 'border-gray-200'"
          @click="scrollTo(index)"
        >
      </template>
    </UCarousel>
  </section>
</template>
