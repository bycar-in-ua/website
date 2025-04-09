<script setup lang="ts">
import BluredEllipse from "@/components/UI/BluredEllipse.vue";
import HelpCta from "./UI/HelpCta.client.vue";
import ContactForm from "./ContactForm.vue";
import TelegramChatButton from "./TelegramChatButton.vue";
defineProps<{ page: string; tgLinkMessage?: string }>();

const sectionRef = ref<HTMLElement | undefined>();

const affixClickHandler = () => {
  const inputElement = document?.getElementById("contact-form-name");

  sectionRef.value?.scrollIntoView({ behavior: "smooth" });
  inputElement?.focus();
};
</script>

<template>
  <section
    id="contact-container"
    ref="sectionRef"
    class="my-4 md:my-24 flex flex-wrap md:flex-nowrap justify-center md:justify-normal gap-8 py-6 md:py-12 relative"
  >
    <slot name="ellipse">
      <BluredEllipse
        class="absolute w-[410px] h-[220px] right-14 -bottom-14 -z-10"
      />
    </slot>

    <div>
      <h3 class="text-2xl font-bold mb-2">
        Не впевнений, яке авто тобі підходить?<br />
        Запитай у експерта!
      </h3>
      <p class="text-base text-gray-500 mb-4">
        Сьогодні на зв'язку Євген. Справжній автофанат,<br />
        любить БМВ і свого песика Тобі
      </p>

      <TelegramChatButton :page="page" :message="tgLinkMessage" />
    </div>

    <ContactForm :page />

    <HelpCta @affix-click="affixClickHandler" />
  </section>
</template>
