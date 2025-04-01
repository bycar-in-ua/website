<script setup lang="ts">
import ContactFormSection from "../ContactFormSection.vue";

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
      trailing
      class="w-48 sm:w-fit flex justify-center bg-bycar-secondary-400 hover:bg-bycar-secondary-500 text-black"
      @click="openModal"
    >
      Хочу!
    </UButton>
  </slot>

  <UModal v-model="isOpen">
    <UCard
      :ui="{
        base: 'h-fit flex flex-col grow',
        body: {
          base: 'flex  justify-center grow',
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

      <ContactFormSection :page class="flex flex-col items-center !my-0 !py-0">
        <template #headline>
          <div class="flex flex-col items-center">
            <h3 class="text-2xl font-bold mb-2 text-center">
              Не впевнений, яке авто тобі підходить?<br />
              Запитай у експерта!
            </h3>
            <p class="text-base text-gray-500 mb-4 text-center">
              Сьогодні на зв'язку Євген. Справжній автофанат, любить БМВ і свого
              песика Тобі
            </p>
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
          </div>
        </template>
      </ContactFormSection>
    </UCard>
  </UModal>
</template>
