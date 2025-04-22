<script setup lang="ts">
const props = defineProps<{
  step?: string;
  title: string;
}>();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center h-full w-full max-w-2xl"
  >
    <div class="h-full w-full flex flex-col justify-center">
      <div v-if="props.step" class="flex justify-end mb-2 mt-auto sm:mt-0">
        {{ props.step }}
      </div>

      <div class="p-4 xs:p-10 ring-1 ring-neutral-200 rounded-2xl">
        <h2
          class="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-8 lg:mb-10"
        >
          {{ title }}
        </h2>

        <slot />
      </div>

      <slot name="extra" />

      <div class="flex flex-wrap justify-end gap-2 mt-auto sm:mt-0 pt-6">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
