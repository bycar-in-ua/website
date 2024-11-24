<script setup lang="ts">
import type { InfoBulletProps } from "./interface.js";

defineProps<InfoBulletProps>();
</script>

<template>
  <div class="flex gap-2 items-end sm:items-center">
    <UIcon
      v-if="typeof icon === 'string'"
      :name="icon"
      class="w-6 md:w-8 h-6 md:h-8 bg-white shrink-0"
    />
    <component :is="icon" v-else class="w-6 md:w-8 h-6 md:h-8 shrink-0" />

    <div class="flex flex-col gap-1">
      <span class="text-[10px] text-white/80 min-w-20">{{ title }}</span>

      <span class="text-xs text-white break-words">{{ value }}</span>
    </div>
  </div>
</template>
