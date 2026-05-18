<script setup lang="ts">
import DrawerHeader from "~/components/UI/DrawerHeader.vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

defineProps<{ title: string; }>();

const emit = defineEmits<{
  apply: [];
  reset: [];
}>();

const breakpoints = useBreakpoints(breakpointsTailwind);

const largerThenMd = breakpoints.greater("md");

const drawerOpen = ref(false);
</script>

<template>
  <UPopover v-if="largerThenMd" :ui="{ content: 'py-3 px-4 popover-content' }" :content="{ side: 'bottom', align: 'start', alignOffset: -14.5 }">
    <slot />

    <template #content>
      <slot name="content" />
    </template>
  </UPopover>

  <UDrawer
    v-else
    v-model:open="drawerOpen"
    direction="bottom"
    inset
    :ui="{
      header: 'border-b border-gray-200 flex items-center justify-between pt-2',
      content: 'min-h-[50svh]',
      container: 'flex-1',
      overlay: 'bg-black/20',
    }"
  >
    <slot />

    <template #header>
      <DrawerHeader :title @close="drawerOpen = false" />
    </template>

    <template #body>
      <slot name="content" />
    </template>

    <template #footer>
      <UButton
        block
        @click="emit('apply'); drawerOpen = false"
      >
        Застосувати
      </UButton>
      <UButton
        block
        variant="outline"
        color="secondary"
        @click="emit('reset'); drawerOpen = false"
      >
        Скинути
      </UButton>
    </template>
  </UDrawer>
</template>

<style>
.popover-content {
  min-width: calc(var(--reka-popover-trigger-width) + 29px); /* 29px is 2x alignOffset */
}
</style>
