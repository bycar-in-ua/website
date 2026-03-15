import type { EmblaCarouselType } from "embla-carousel";
import type { TemplateRef } from "vue";

export type VehicleGalleryImage = {
  id: string | number;
  src: string;
  alt?: string;
};

type CarouselExpose = {
  emblaApi?: EmblaCarouselType;
};

type CarouselGalleryProps = {
  images: VehicleGalleryImage[];
  mainCarousel?: TemplateRef<CarouselExpose>;
  thumbCarousel?: TemplateRef<CarouselExpose>;
};

export function useCarouselGallery({
  images, mainCarousel, thumbCarousel,
}: CarouselGalleryProps) {
  const hasImages = computed(() => images.length > 0);
  const canNavigate = computed(() => images.length > 1);
  const currentIndex = ref(0);

  const syncFromMainCarousel = () => {
    const selectedIndex = mainCarousel?.value?.emblaApi?.selectedScrollSnap() ?? 0;
    thumbCarousel?.value?.emblaApi?.scrollTo(selectedIndex);
    currentIndex.value = selectedIndex;
  };

  const scrollTo = (index: number, jump?: boolean) => {
    if (!canNavigate.value) {
      return;
    }

    mainCarousel?.value?.emblaApi?.scrollTo(index, jump);
  };

  watch(
    () => mainCarousel?.value?.emblaApi,
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

  return {
    currentIndex: readonly(currentIndex),
    hasImages,
    scrollTo,
  };
}
