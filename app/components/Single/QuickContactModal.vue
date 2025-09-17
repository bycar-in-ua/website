<script setup lang="ts">
import ContactForm from "../ContactForm.vue";
import TelegramChatButton from "../TelegramChatButton.vue";

defineProps<{ page: string; }>();

const { gtag } = useGtag();

const logEvent = () => {
  gtag("event", "quick_contact_open", {
    event_category: "quick_contact",
    event_label: "open",
  });
};
</script>

<template>
  <UModal
    :ui="{ content: 'flex flex-col gap-2 sm:gap-4 md:gap-6 justify-center items-center p-4 sm:p-6 divide-none' }"
    @after:enter="logEvent"
  >
    <template #content="{ close }">
      <UButton
        icon="i-heroicons-x-mark"
        variant="ghost"
        color="neutral"
        class="absolute top-4 right-4"
        @click="close"
      />

      <div class="flex flex-col items-center">
        <h3 class="text-xl md:text-2xl font-bold mb-2 text-center px-8">
          Отримайте пораду експерта
        </h3>
        <p class="text-base text-gray-500 text-center">
          Наш експерт зв’яжеться з вами, щоб допомогти з вибором авто та відповісти на всі питання.
        </p>
      </div>

      <ContactForm :page class="max-w-full shadow-none px-0" />

      <USeparator label="або" class="my-4 md:my-0" />

      <TelegramChatButton :page="page" :message="`Вітаю! Хочу дізнатись умови спецпропозиції на ${page}`" />
    </template>
  </UModal>
</template>
