<script setup lang="ts">
const props = defineProps<{
  page: string;
  message?: string;
}>();

const { gtag } = useGtag();
const { $fbq } = useNuxtApp()

const tgUrl = new URL("https://t.me/AJ201997");

if (props.message) {
  tgUrl.searchParams.set("text", encodeURIComponent(props.message ?? ""));
}
</script>

<template>
  <UButton
    icon="i-heroicons-chat-bubble-bottom-center"
    trailing
    variant="outline"
    size="lg"
    :to="decodeURI(tgUrl.toString())"
    target="_blank"
    @click="
      gtag('event', 'telegram_chat_click', {
        event_category: 'engagement',
        event_label: page,
      });
      $fbq?.('track', 'Lead', {
        content_name: 'Telegram Chat',
        content_category: page,
      });
    "
  >
    Написати в чат
  </UButton>
</template>
