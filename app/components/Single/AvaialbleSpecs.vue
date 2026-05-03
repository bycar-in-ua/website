<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";
import SectionTitle from "~/components/UI/SectionTitle.vue";
import SpecsBlock from "~/components/Single/SpecsBlock.vue";
import OptionsBlock from "~/components/Single/OptionsBlock.vue";
import type { AvailableVehicleView } from "@bycar-in-ua/vehicles-sdk";

defineProps<{ car: AvailableVehicleView; }>();

const accordionItems: AccordionItem[] = [
  {
    slot: "specs",
    label: "Характеристики",
  },
  {
    slot: "options",
    label: "Опції",
  },
  {
    slot: "description",
    label: "Опис",
  },
];
</script>

<template>
  <section class="container xl:flex xl:gap-6 my-12 sm:my-16 md:my-20">
    <SectionTitle :title="['Специфікація', 'Ключові особливості']" class="basis-102 shrink-0 items-start mb-8 md:mb-12" />

    <UAccordion
      :default-value="['0']"
      :items="accordionItems"
      type="multiple"
      :ui="{
        label: 'text-xl font-semibold',
        content: 'pb-6 max-sm:overflow-visible',
        trigger: 'py-6',
      }"
    >
      <template #trailing="{ open }">
        <UIcon :name="open ? 'i-lucide-minus' : 'i-lucide-plus'" class="ml-auto size-6" />
      </template>

      <template #specs>
        <SpecsBlock :car="car" :trim="car.trim" :power-unit="car.trim.powerUnits[0]" />
      </template>

      <template #options>
        <OptionsBlock :options="car.trim?.options" />
      </template>

      <template #description>
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="prose"
          v-html="car.description"
        />
      </template>
    </UAccordion>
  </section>
</template>
