<script setup lang="ts">
const props = defineProps<{
  page: string;
  message?: string;
}>();

const { gtag } = useGtag();

const tgUrl = new URL("https://t.me/AJ201997");

if (props.message) {
  tgUrl.searchParams.set("text", props.message ?? "");
}
</script>

<template>
  <UButton
    icon="i-heroicons-chat-bubble-bottom-center"
    trailing
    variant="outline"
    :to="tgUrl.toString()"
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
