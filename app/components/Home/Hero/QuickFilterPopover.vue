<template>
  <UPopover :ui="{ content: 'py-3 px-4 popover-content' }" :content="{ side: 'bottom', align: 'start', alignOffset: -14.5 }">
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
