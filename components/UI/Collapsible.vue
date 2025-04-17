<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from "reka-ui";

defineProps<{ title?: string }>();
</script>

<template>
  <CollapsibleRoot>
    <CollapsibleTrigger as-child>
      <slot>
        <div class="trigger font-medium cursor-pointer flex justify-between gap-1 mb-5">
          {{ title }}

          <UIcon name="i-heroicons-chevron-down" class="trigger-icon w-6 h-6 text-primary transition-transform duration-300" />
        </div>
      </slot>
    </CollapsibleTrigger>

    <CollapsibleContent class="collapsible-content">
      <slot name="content" />
    </CollapsibleContent>

    <slot name="footer">
      <UDivider class="my-5" />
    </slot>
  </CollapsibleRoot>
</template>

<style>
.trigger[data-state="open"] .trigger-icon {
  @apply rotate-180
}

.collapsible-content {
  overflow: hidden;
}
.collapsible-content[data-state="open"] {
  animation: slideDown 300ms ease-out;
}
.collapsible-content[data-state="closed"] {
  animation: slideUp 300ms ease-out;
}

@keyframes slideDown {
  from {
    height: 0;
  }
  to {
    height: var(--radix-collapsible-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--radix-collapsible-content-height);
  }
  to {
    height: 0;
  }
}
</style>
