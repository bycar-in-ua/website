<script setup lang="ts">
import { type SupportedSize, useCdnImage } from "@/composables/useCdnImage";

const props = defineProps<{
  src: string;
  size: SupportedSize;
  densities?: Array<`${SupportedSize}:${string}`>;
}>();

const img = useCdnImage();

const src = computed(() => img(props.src, props.size));

const srcset = computed(() => {
  if (!props.densities) return;

  return props.densities
    .map((density) => {
      const [size, value] = density.split(":");

      return `${img(props.src, size as SupportedSize)} ${value}`;
    })
    .join(", ");
});
</script>

<template>
  <img :src :srcset />
</template>
