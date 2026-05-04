<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

type Props = {
  header?: string;
  ui?: {
    header?: string;
    body?: string;
    footer?: string;
  };
};

defineProps<Props>();

const breakpoints = useBreakpoints(breakpointsTailwind);

const largerThenMd = breakpoints.greater("md");

const open = defineModel<boolean>("open", { default: false });
</script>

<template>
  <USlideover
    v-if="largerThenMd"
    v-model:open="open"
    inset
    close
    :ui="{
      ...ui,
      content: 'md:max-w-131 w-full',
    }"
  >
    <template #header="{ close }">
      <slot name="header">
        <h2 class="text-lg font-bold">
          {{ header }}
        </h2>
      </slot>

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
      ...ui,
      container: 'h-full',
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
