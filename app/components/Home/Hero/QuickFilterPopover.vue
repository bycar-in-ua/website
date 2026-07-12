<script setup lang="ts">
import DrawerHeader from "~/components/UI/DrawerHeader.vue";
import { useResponsiveState } from "~/composables/useResponsiveState";

defineProps<{ title: string; }>();

const emit = defineEmits<{
  apply: [];
  reset: [];
}>();

const { isMobile } = useResponsiveState();

const drawerOpen = ref(false);
</script>

<template>
  <UDrawer
    v-if="isMobile"
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

  <UPopover v-else :ui="{ content: 'py-3 px-4 popover-content' }" :content="{ side: 'bottom', align: 'start', alignOffset: -14.5 }">
    <slot />

    <template #content>
      <slot name="content" />
    </template>
  </UPopover>
</template>

<style>
.popover-content {
  min-width: calc(var(--reka-popover-trigger-width) + 29px); /* 29px is 2x alignOffset */
}
</style>
