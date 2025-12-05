<script setup lang="ts">
import SectionTitle from "~/components/UI/SectionTitle.vue";
import type { AccordionItem } from "@nuxt/ui";

const items: AccordionItem[] = [
  { label: "Сімейне авто" },
  { label: "Найкращі гібриди" },
  { label: "Найкращі електрокари" },
  { label: "Рекомендовані авто" },
];
</script>

<template>
  <section class="my-10 md:my-20">
    <SectionTitle
      :title="['Всі авто', 'Підбірки найкращих моделей']"
    />

    <UAccordion :items="items">
      <template #body="{ item }">
        {{ item.label }}
      </template>
    </UAccordion>
  </section>
</template>
