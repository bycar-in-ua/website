<script setup lang="ts">
import SectionTitle from "@/components/UI/SectionTitle.vue";
import { YouTubeVideoCard, type YouTubeVideoItem } from "../UI/VideoCard";

defineProps<{
  videos: YouTubeVideoItem[];
}>();

const carouselRef = useTemplateRef("carouselRef");

const mouseoverHandler = () => {
  carouselRef.value?.emblaApi?.plugins().autoplay.stop();
};

const mouseleaveHandler = () => {
  carouselRef.value?.emblaApi?.plugins().autoplay.play();
};
</script>

<template>
  <section
    v-if="videos?.length"
    class="my-10 md:my-24"
    @mouseover="mouseoverHandler"
    @mouseleave="mouseleaveHandler"
    @touchstart="mouseoverHandler"
    @touchend="mouseleaveHandler"
  >
    <SectionTitle title="Останні відео на каналі">
      <template #extra>
        <UButtonGroup size="sm" orientation="horizontal">
          <UButton
            variant="ghost"
            icon="i-heroicons-chevron-left"
            @click="carouselRef?.emblaApi?.scrollPrev()"
          />
          <UButton
            variant="ghost"
            icon="i-heroicons-chevron-right"
            @click="carouselRef?.emblaApi?.scrollNext()"
          />
        </UButtonGroup>
      </template>
    </SectionTitle>

    <UCarousel
      ref="carouselRef"
      :items="videos"
      :ui="{
        root: 'basis-full',
        arrows: 'opacity-40 hover:opacity-100 transition-opacity',
        dots: 'static mt-4',
      }"
      class="overflow-hidden"
      style="--ui-border-inverted: var(--ui-primary)"
      dots
      loop
      :autoplay="{
        delay: 5000,
      }"
    >
      <template #default="{ item }">
        <YouTubeVideoCard :item />
      </template>
    </UCarousel>
  </section>
</template>
