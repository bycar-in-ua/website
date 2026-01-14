<script setup lang="ts">
import SectionTitle from "~/components/UI/SectionTitle.vue";
import type { AccordionItem } from "@nuxt/ui";
import type { HomepageData } from "~~/shared/types";
import CarCard from "../UI/CarCard/CarCard.vue";

// TODO: use real dta for each collection
const props = defineProps<{ latestItems: HomepageData["latestItems"]; }>();

const items: AccordionItem[] = [
  { label: "Сімейне авто" },
  { label: "Найкращі гібриди" },
  { label: "Найкращі електрокари" },
  { label: "Рекомендовані авто" },
];

const carouselItems = computed(() => {
  if (props.latestItems.items.length === 0) {
    return [];
  }

  // Split items into chunks of 3 for carousel slides
  const chunkSize = 3;
  const chunks = [];

  for (let i = 0; i < props.latestItems.items.length; i += chunkSize) {
    chunks.push(props.latestItems.items.slice(i, i + chunkSize));
  }

  return chunks;
});
</script>

<template>
  <section class="my-10 md:my-20">
    <SectionTitle
      :title="['Всі авто', 'Підбірки найкращих моделей']"
      class="mb-10"
    />

    <UAccordion
      default-value="0"
      :items="items"
      :ui="{
        label: 'text-3xl font-semibold',
      }"
    >
      <template #trailing>
        <UButton variant="outline" class="ml-auto">
          {{ carouselItems.length }} пропозиції
        </UButton>
      </template>

      <template #body>
        <UCarousel
          v-slot="{ item }"
          dots
          loop
          :items="carouselItems"
          :ui="{
            viewport: 'overflow-visible relative z-10 mb-14',
          }"
        >
          <div class="grid grid-cols-3 gap-2">
            <!-- TODO: `is-compared` and `toggle-compare` -->
            <CarCard
              v-for="car in item"
              :key="car.id"
              :car="car"
              :is-compared="true"
            />
          </div>
        </UCarousel>
      </template>
    </UAccordion>
  </section>
</template>
