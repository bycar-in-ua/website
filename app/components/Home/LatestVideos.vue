<script setup lang="ts">
import SectionTitle from "~/components/UI/SectionTitle.vue";
import { YouTubeVideoCard, type YouTubeVideoItem } from "../UI/VideoCard";

const carousel = useTemplateRef("carousel");

const mouseoverHandler = () => {
  carousel.value?.emblaApi?.plugins().autoplay.stop();
};

const mouseleaveHandler = () => {
  carousel.value?.emblaApi?.plugins().autoplay.play();
};

const { data: videos } = await useFetch<YouTubeVideoItem[]>(
  "/api/latest-youtube-video", { default: () => [] },
);
</script>

<template>
  <section
    v-if="videos?.length"
    class="py-12 md:p-20 bg-black"
    @mouseover="mouseoverHandler"
    @mouseleave="mouseleaveHandler"
    @touchstart="mouseoverHandler"
    @touchend="mouseleaveHandler"
  >
    <div class="container">
      <SectionTitle :title="['Огляди', 'Нові відео на каналі']" class="mb-10 dark">
        <template #extra>
          <div class="hidden md:flex items-center gap-2">
            <UButton
              to="https://www.youtube.com/@bycar.in.ua_"
              color="secondary"
              variant="solid"
            >
              Перейти на канал
            </UButton>

            <UButton
              variant="outline"
              color="secondary"
              icon="i-lucide-chevron-left"
              class="ml-4 "
              @click="carousel?.emblaApi?.scrollPrev()"
            />
            <UButton
              variant="outline"
              color="secondary"
              icon="i-lucide-chevron-right"
              @click="carousel?.emblaApi?.scrollNext()"
            />
          </div>
        </template>
      </SectionTitle>
    </div>

    <UCarousel
      ref="carousel"
      :items="videos"
      :ui="{
        item: 'w-fit h-fit basis-auto transition-opacity [&:not(.is-snapped)]:opacity-10',
        dots: 'absolute inset-x-0 -bottom-7 flex flex-wrap items-center justify-center gap-3 ',
        dot: 'bg-gray-800 data-[state=active]:bg-white',
      }"
      class-names
      dots
      loop
      auto-height
      :autoplay="{
        delay: 5000,
      }"
    >
      <template #default="{ item }">
        <YouTubeVideoCard :item />
      </template>
    </UCarousel>

    <UButton
      to="https://www.youtube.com/@bycar.in.ua_"
      color="secondary"
      variant="solid"
      class="flex md:hidden mt-15 justify-center"
    >
      Перейти на канал
    </UButton>
  </section>
</template>
