<script setup lang="ts">
import type { Component } from "vue";
import DrawerSlideover from "~/components/UI/DrawerSlideover.vue";
import { useQuizStore } from "#layers/quiz/stores/quiz";
import { type QuizStep, QUIZ_STEPS } from "../quiz.types";
import BodyTypeStep from "./BodyTypeStep.vue";
import PriceStep from "./PriceStep.vue";

const quizStore = useQuizStore();

const quizStepsComponents: Record<QuizStep, Component> = {
  [QUIZ_STEPS.BODY]: BodyTypeStep,
  [QUIZ_STEPS.ENGINE]: BodyTypeStep,
  [QUIZ_STEPS.DRIVE]: BodyTypeStep,
  [QUIZ_STEPS.PRICE]: PriceStep,
  [QUIZ_STEPS.BRAND]: BodyTypeStep,
};

const backHandler = () => {
  if (quizStore.step === 1) {
    quizStore.isOpen = false;
    return;
  }
  quizStore.step -= 1;
};
</script>

<template>
  <DrawerSlideover v-model:open="quizStore.isOpen" :ui="{ body: 'md:p-8', footer: 'md:flex-row md:justify-between' }">
    <template #header>
      <h2 class="text-lg font-bold uppercase">
        Підбір авто
      </h2>
    </template>

    <template #body>
      <component :is="quizStepsComponents[quizStore.step]" />
    </template>

    <template #footer>
      <UButton
        variant="link"
        color="secondary"
        icon="i-lucide-arrow-left"
        @click="backHandler"
      >
        Назад
      </UButton>
      <UButton clock class="md:w-fit">
        Наступний крок
      </UButton>
    </template>
  </DrawerSlideover>
</template>
