<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);

const largerThenMd = breakpoints.greater("md");

defineProps<{
  hideBorders?: boolean;
  bodyClass?: string;
}>();

const open = defineModel<boolean>("open", { default: false });
</script>

<template>
  <USlideover
    v-if="largerThenMd"
    v-model:open="open"
    inset
    close
    :ui="{
      content: 'md:max-w-131 w-full',
      header: `sm:p-8 sm:pb-6 relative ${hideBorders ? 'border-b-0' : ''}`,
      body: `sm:p-8 ${bodyClass || ''}`,
      footer: `sm:p-8 sm:pt-6 ${hideBorders ? 'border-t-0' : ''}`,
    }"
  >
    <template #header="{ close }">
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

    <template #body="bodyProps">
      <slot name="body" v-bind="bodyProps" />
    </template>

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </USlideover>

  <UDrawer
    v-else
    v-model:open="open"
    direction="bottom"
    inset
    :ui="{
      content: 'h-full max-h-[90svh]',
    }"
  >
    <template #header>
      <slot name="header" />

      <UButton
        icon="i-lucide-x"
        square
        variant="link"
        color="neutral"
        class="absolute right-4 top-6 p-0"
        @click="open = false"
      />
    </template>

    <template #body>
      <slot name="body" />
    </template>

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </UDrawer>
</template>
