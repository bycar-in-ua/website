<script setup lang="ts">
import ContactFormSection from "~/components/ContactFormSection.vue";
</script>

<template>
  <p class="text-center p-4 text-xl" v-text="$t('emptyCatalog')" />
  <ContactFormSection
    page="Каталог"
    class="md:justify-between"
  >
    <template #message>
      <h3 class="text-2xl font-bold mb-2">
        Не вдалось знайти бажане авто в каталозі?<br>
        Запитай у експерта!
      </h3>
      <p class="text-base text-gray-500 mb-4">
        Можливо, є додаткова інформація або ще не все оновлено в каталозі.
      </p>
    </template>
  </ContactFormSection>
</template>
