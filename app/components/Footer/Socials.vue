<script setup lang="ts">
import { YOUTUBE_CHANNEL_URL, INSTAGRAM_CHANNEL_URL, TELEGRAM_CHANNEL_URL } from "~/utils/constants";
import TelegramLogo from "../UI/Icons/TelegramLogo.vue";

const socials = [
  {
    to: INSTAGRAM_CHANNEL_URL,
    title: "Instagram",
    icon: "i-lucide-instagram",
  },
  {
    to: YOUTUBE_CHANNEL_URL,
    title: "YouTube",
    icon: "i-lucide-youtube",
  },
  {
    to: TELEGRAM_CHANNEL_URL,
    title: "Telegram",
    icon: TelegramLogo,
  },
];
</script>

<template>
  <div class="flex gap-6">
    <NuxtLink
      v-for="social in socials"
      :key="social.title"
      :to="social.to"
      target="_blank"
      :title="social.title"
      class="inline-flex justify-center items-center w-11 h-11 bg-gray-900 text-white p-2.5 rounded-full"
    >
      <UIcon
        v-if="typeof social.icon === 'string'"
        :name="social.icon"
        class="w-full h-full"
      />
      <component :is="social.icon" v-else />
    </NuxtLink>
  </div>
</template>
