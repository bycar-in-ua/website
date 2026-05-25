<script setup lang="ts">
import RoadSign from "~/components/UI/RoadSign.vue";

defineProps<{ description?: string; }>();
</script>

<template>
  <div class="flex flex-col items-center py-10 md:py-14">
    <RoadSign class="mb-8">
      Авто<br>
      не знайдено
    </RoadSign>

    <p class="max-w-4xl mb-4 sm:mb-6 text-toned font-semibold text-lg sm:text-xl text-center text-balanced">
      {{ description }}
    </p>

    <slot name="extra" />
  </div>
</template>
