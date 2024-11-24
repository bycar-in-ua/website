<script setup lang="ts">
import type { InfoBulletProps } from "./interface.js";

defineProps<InfoBulletProps>();
</script>

<template>
  <div class="flex gap-1 md:gap-2">
    <UIcon v-if="typeof icon === 'string'" :name="icon" class="w-6 md:w-8 h-6 md:h-8 bg-white" />
    <component :is="icon" v-else class="w-6 md:w-8 h-6 md:h-8 self-center" />

    <div class="flex flex-col gap-1 max-w-[130px]">
      <span class="text-[10px] text-white/80">{{ title }}</span>

      <span class="text-xs text-white break-words">{{ value }}</span>
    </div>
  </div>
</template>
