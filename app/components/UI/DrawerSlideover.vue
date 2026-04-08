<script setup lang="ts">
defineProps<{
  hideBorders?: boolean;
  bodyClass?: string;
}>();
</script>

<template>
  <USlideover
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
</template>
