<script setup lang="ts">
type VehicleGalleryImage = {
  id: string | number;
  src: string;
  alt?: string;
};

const props = withDefaults(defineProps<{
  images: VehicleGalleryImage[];
  isAvailableNow?: boolean;
}>(), { isAvailableNow: false });

const emit = defineEmits<{
  openFullscreen: [index: number];
}>();

const cdnImage = useCdnImage();

const mainCarousel = useTemplateRef("mainCarousel");
const thumbCarousel = useTemplateRef("thumbCarousel");

const currentIndex = ref(0);

const hasImages = computed(() => props.images.length > 0);
const canNavigate = computed(() => props.images.length > 1);

const mainImageSize = computed(() => {
  return currentIndex.value === 0 ? "large" : "medium";
});

const setCurrentIndex = (index: number) => {
  if (!props.images.length) {
    currentIndex.value = 0;
    return;
  }

  const normalizedIndex = Math.max(0, Math.min(index, props.images.length - 1));
  currentIndex.value = normalizedIndex;
};

const syncFromMainCarousel = () => {
  const selectedIndex = mainCarousel.value?.emblaApi?.selectedScrollSnap();

  if (typeof selectedIndex === "number") {
    setCurrentIndex(selectedIndex);
    thumbCarousel.value?.emblaApi?.scrollTo(selectedIndex);
  }
};

const scrollTo = (index: number) => {
  if (!canNavigate.value) {
    return;
  }

  mainCarousel.value?.emblaApi?.scrollTo(index);
};

const scrollPrev = () => {
  if (!canNavigate.value) {
    return;
  }

  mainCarousel.value?.emblaApi?.scrollPrev();
};

const scrollNext = () => {
  if (!canNavigate.value) {
    return;
  }

  mainCarousel.value?.emblaApi?.scrollNext();
};

const openFullscreen = () => {
  emit("openFullscreen", currentIndex.value);
};

const onGlobalArrowKeydown = (event: KeyboardEvent) => {
  if (!canNavigate.value) {
    return;
  }

  const target = event.target;
  if (
    target instanceof HTMLElement
    && (target.isContentEditable
      || [
        "INPUT", "TEXTAREA", "SELECT",
      ].includes(target.tagName))
  ) {
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    scrollPrev();
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    scrollNext();
  }
};

watch(
  () => mainCarousel.value?.emblaApi,
  (emblaApi, oldEmblaApi) => {
    if (oldEmblaApi) {
      oldEmblaApi.off("select", syncFromMainCarousel);
      oldEmblaApi.off("reInit", syncFromMainCarousel);
    }

    if (emblaApi) {
      emblaApi.on("select", syncFromMainCarousel);
      emblaApi.on("reInit", syncFromMainCarousel);
      syncFromMainCarousel();
    }
  },
  { flush: "post" },
);

onMounted(() => {
  document.addEventListener("keydown", onGlobalArrowKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onGlobalArrowKeydown);
});
</script>

<template>
  <section v-if="hasImages" class="mb-6 md:mb-10">
    <div class="relative group">
      <UBadge
        v-if="isAvailableNow"
        icon="i-lucide-clock-3"
        label="Доступно зараз"
        variant="solid"
        class="absolute left-4 top-4 z-10 bg-white"
      />

      <UCarousel
        ref="mainCarousel"
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
        class="rounded-none overflow-hidden"
      >
        <template #default="{ item }">
          <img
            :src="cdnImage(item.src, mainImageSize)"
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
