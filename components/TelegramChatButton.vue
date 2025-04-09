<script setup lang="ts">
defineProps<{
  page: string;
}>();

const { gtag } = useGtag();
</script>

<template>
  <UButton
    icon="i-heroicons-chat-bubble-bottom-center"
    trailing
    variant="outline"
    to="https://t.me/AJ201997"
    target="_blank"
    @click="
      gtag('event', 'telegram_chat_click', {
        event_category: 'engagement',
        event_label: page,
      })
    "
  >
    Написати в чат
  </UButton>
</template>
