<script setup lang="ts">
defineEmits(["affixClick"]);
</script>

<template>
  <UTooltip
    text="Замовити консультацію"
    class="fixed bottom-4 right-4 z-20"
    :popper="{ placement: 'left' }"
  >
    <UButton
      icon="i-heroicons-chat-bubble-left"
      :ui="{ rounded: 'rounded-full' }"
      size="xl"
      circle
      @click="$emit('affixClick')"
    />
  </UTooltip>
</template>
