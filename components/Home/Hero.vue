<script setup lang="ts">
import BluredEllipse from "@/components/UI/BluredEllipse.vue";
import Quiz from "~/components/Quiz/Quiz.vue";
import { generatePageTitle } from "@/utils/seo";

defineProps<{ totalCars?: number }>();

const heroAlt = generatePageTitle("Легкий шлях до нового авто");
</script>

<template>
  <section
    class="flex flex-col sm:flex-row relative py-4 sm:py-12 md:py-24 lg:py-52"
  >
    <BluredEllipse
      class="absolute w-[410px] h-[220px] bottom-32 sm:bottom-12 sm:left-24 md:left-[220px] md:bottom-[67px]"
    />
    <div class="md:basis-3/5 flex flex-col md:justify-center items-start z-10">
      <h1 class="text-3xl md:text-5xl font-semibold mb-4">
        Bycar - мультибрендовий
        <span
          class="relative inline-block before:block before:absolute before:-z-10 before:w-14 before:h-14 md:before:w-24 md:before:h-24 before:left-1/2 before:-translate-x-1/2 before:top-1/2 before:-translate-y-[45%] before:rounded-full before:bg-bycar-secondary-500"
        >
          онлайн
        </span>
        автосалон
      </h1>
      <h2 class="text-sm md:text-base font-medium mb-6 sm:mb-8 md:mb-12">
        Тисни кнопку і давай почнемо
      </h2>

      <h3 v-if="totalCars && totalCars > 0" class="mb-2 hidden sm:block">
        {{ totalCars }} активних пропозицій
      </h3>

      <img
        src="/images/hero-image-mobile.png"
        :alt="heroAlt"
        provider="bycar"
        class="mb-6 w-full sm:hidden"
      />

      <Quiz />

      <h3
        v-if="totalCars && totalCars > 0"
        class="mt-2 text-center w-full sm:hidden"
      >
        {{ totalCars }} активних пропозицій
      </h3>
    </div>
    <div class="hidden sm:flex flex-grow mt-10 md:mt-0 flex-col justify-center">
      <div
        class="relative w-[130%] md:w-[160%] -right-1/3 sm:right-0 md:right-32 lg:right-52 bottom-14 sm:bottom-2 md:-bottom-16 lg:bottom-0 z-0"
      >
        <img
          src="/images/hero-image.png"
          :alt="heroAlt"
          provider="bycar"
          class="absolute w-full top-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  </section>
</template>
