<script setup lang="ts">
defineProps<{
  imgPath?: string;
  carTitle: string;
}>();
</script>

<template>
  <div class="relative aspect-video overflow-hidden">
    <div>
      <CdnImage
        v-if="imgPath"
        :src="imgPath"
        :alt="carTitle"
        size="small"
        :densities="['small:1x', 'medium:2x']"
        loading="lazy"
        class="object-cover h-full"
      />
      <img
        v-else
        src="/images/placeholder-image.jpg"
        class="object-cover h-full"
      />

      <div class="p-4 text-white absolute inset-0 flex flex-col z-10">
        <div class="flex items-start w-full">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
