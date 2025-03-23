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
      <div v-if="props.step" class="flex justify-end mb-2 mt-auto xs:mt-0">
        {{ props.step }}
      </div>

      <div class="p-4 xs:p-10 ring-1 rounded-2xl">
        <h1 class="text-3xl font-semibold mb-10">{{ title }}</h1>

        <slot />
      </div>

      <slot name="footer" />
    </div>
  </div>
</template>
