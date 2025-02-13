<script setup lang="ts">
import type { InfoBulletProps } from "./interface.js";

const props = defineProps<InfoBulletProps & { color?: "white" | "black" }>();

const colorClasses = computed(() => {
  if (props.color === "black") {
    return {
      text: "text-gray-900",
      lightText: "text-gray-900/80",
      bg: "bg-gray-900",
    };
  }

  return {
    text: "text-white",
    lightText: "text-white/80",
    bg: "bg-white",
  };
});
</script>

<template>
  <div class="flex gap-2 items-end sm:items-center">
    <UIcon
      v-if="typeof icon === 'string'"
      :name="icon"
      class="w-6 md:w-8 h-6 md:h-8 shrink-0"
      :class="colorClasses.bg"
    />
    <component
      :is="icon"
      v-else
      class="w-6 md:w-8 h-6 md:h-8 shrink-0"
      :color
    />

    <div class="flex flex-col gap-1">
      <span class="text-[10px] min-w-20" :class="colorClasses.lightText">
        {{ title }}
      </span>

      <span class="text-xs break-words" :class="colorClasses.text">
        {{ value }}
      </span>
    </div>
  </div>
</template>
