<script setup lang="ts">
import type { YouTubeVideoItem } from "./interface";

defineProps<{ item: YouTubeVideoItem }>();
</script>

<template>
  <div class="flex gap-4 sm:gap-8 flex-col sm:flex-row">
    <div class="sm:basis-2/3 sm:flex-shrink-0">
      <div
        class="aspect-video rounded-3xl overflow-hidden"
      >
        <iframe
          width="560"
          height="315"
          :src="`https://www.youtube.com/embed/${item.videoId}`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          class="w-full h-full"
        ></iframe>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-2 sm:basis-1/3">
        {{ item.title }}
      </h2>
      <p>{{ item.description }}</p>
      <UButton
        variant="link"
        :padded="false"
        icon="i-heroicons-arrow-right"
        trailing
        class="mt-4"
        :to="`https://www.youtube.com/watch?v=${item.videoId}`"
        target="_blank"
      >
        Перейти на YouTube
      </UButton>
    </div>
  </div>
</template>
