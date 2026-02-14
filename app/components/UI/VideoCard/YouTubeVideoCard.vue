<script setup lang="ts">
import type { YouTubeVideoItem } from "./interface";

defineProps<{ item: YouTubeVideoItem; }>();

const isIframeShown = ref(false);

function getYouTubeThumbnail(
  videoId: string,
  quality: "default" | "mq" | "hq" | "max" = "hq",
) {
  const map = {
    default: "default.jpg",
    mq: "mqdefault.jpg",
    hq: "hqdefault.jpg",
    max: "maxresdefault.jpg",
  };

  return `https://img.youtube.com/vi/${videoId}/${map[quality]}`;
};
</script>

<template>
  <div class="relative sm:basis-2/3 sm:shrink-0">
    <div
      class="aspect-video rounded-3xl overflow-hidden w-full md:max-h-[450px] flex items-center"
    >
      <iframe
        v-if="isIframeShown"
        width="848"
        height="450"
        :src="`https://www.youtube.com/embed/${item.videoId}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />
      <div v-else class="relative w-full">
        <img :src="getYouTubeThumbnail(item.videoId, 'max')" alt="YouTube Video Thumbnail" class="w-full">

        <div
          class="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent rounded-xl flex items-center justify-center"
        >
          <UButton class="rounded-full h-14 w-14  bg-white text-black justify-center" @click="isIframeShown = true">
            <UIcon name="i-lucide-play" class="size-6 cursor-pointer" />
          </UButton>

          <p
            class="absolute bottom-0 p-6 text-base md:text-2xl font-bold text-white w-full truncate sm:whitespace-normal sm:overflow-visible"
          >
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
