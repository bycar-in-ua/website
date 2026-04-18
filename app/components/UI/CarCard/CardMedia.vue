<script setup lang="ts">
defineProps<{
  imgPath?: string;
  carTitle: string;
}>();
</script>

<template>
  <div class="relative aspect-video overflow-hidden">
    <CdnImage
      v-if="imgPath"
      :src="imgPath"
      :alt="carTitle"
      size="small"
      :densities="['small:1x', 'medium:2x']"
      loading="lazy"
      class="object-cover w-full h-full"
    />
    <img
      v-else
      src="/images/placeholder-image.jpg"
      class="object-cover w-full h-full"
    >

    <div class="text-white absolute inset-4 flex flex-col z-10">
      <div class="flex items-start w-full">
        <slot />
      </div>
    </div>
  </div>
</template>
