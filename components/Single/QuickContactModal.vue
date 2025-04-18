<script setup lang="ts">
import ContactForm from "../ContactForm.vue";
import TelegramChatButton from "../TelegramChatButton.vue";

defineProps<{ page: string }>();

const isOpen = ref(false);

const { gtag } = useGtag();

const openModal = () => {
  isOpen.value = true;

  gtag("event", "quick_contact_open", {
    event_category: "quick_contact",
    event_label: "open",
  });
};
</script>

<template>
  <slot name="trigger" :open="openModal">
    <UButton
      color="secondary"
      class="flex justify-center text-black font-bold"
      @click="openModal"
    >
      Отримати спецпропозицію!
    </UButton>
  </slot>

  <UModal v-model="isOpen">
    <UCard
      :ui="{
        base: 'h-fit flex flex-col grow',
        body: {
          base: 'flex flex-col gap-2 sm:gap-4 md:gap-6 justify-center items-center grow',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-end">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>

      <div class="flex flex-col items-center">
        <h3 class="text-md md:text-lg font-bold mb-2 text-center">
          Щоб отримати детальну інформацію про {{ page }} — наявність, спеціальні пропозиції та найвигідніші умови залиште, будь ласка, свій номер телефону
        </h3>
        <p class="text-base text-gray-500 text-center">
          Наш менеджер зв’яжеться з вами найближчим часом і допоможе обрати оптимальний варіант
        </p>
      </div>

      <ContactForm :page />

      <UDivider label="або" class="my-4 md:my-0" />

      <TelegramChatButton :page="page" :message="`Вітаю! Хочу дізнатись умови спецпропозиції на ${page}`" />
    </UCard>
  </UModal>
</template>
