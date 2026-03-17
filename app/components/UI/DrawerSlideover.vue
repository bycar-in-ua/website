<script setup lang="ts">
import type { SlideoverProps } from "@nuxt/ui";

defineProps<SlideoverProps>();
</script>

<template>
  <USlideover
    inset
    close
    :ui="{
      content: 'md:max-w-131 w-full',
      header: 'sm:p-8 sm:pb-6 relative',
      body: 'sm:p-8',
      footer: 'sm:p-8 sm:pt-6',
    }"
  >
    <slot />

    <template v-if="$slots.header" #header="{ close }">
      <slot name="header" />

      <UButton
        icon="i-lucide-x"
        square
        variant="link"
        color="secondary"
        class="absolute right-6 top-4 p-0"
        @click="close"
      />
    </template>

    <template #body>
      <slot name="body" />
    </template>

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </USlideover>
</template>
