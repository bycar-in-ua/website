<script setup lang="ts">
import type { Component } from "vue";
import DrawerSlideover from "~/components/UI/DrawerSlideover.vue";
import { useQuizStore } from "#layers/quiz/stores/quiz";
import { type QuizStep, QUIZ_STEPS } from "../quiz.types";
import BodyTypeStep from "./BodyTypeStep.vue";
import EngineStep from "./EngineStep.vue";
import DriveTypeStep from "./DriveTypeStep.vue";
import PriceStep from "./PriceStep.vue";
import BrandStep from "./BrandStep.vue";

const quizStore = useQuizStore();

const quizStepsComponents: Record<QuizStep, Component> = {
  [QUIZ_STEPS.BODY]: BodyTypeStep,
  [QUIZ_STEPS.ENGINE]: EngineStep,
  [QUIZ_STEPS.DRIVE]: DriveTypeStep,
  [QUIZ_STEPS.PRICE]: PriceStep,
  [QUIZ_STEPS.BRAND]: BrandStep,
};
</script>

<template>
  <DrawerSlideover v-model:open="quizStore.isOpen" :ui="{ body: 'md:p-8', footer: 'md:flex-row md:justify-between relative' }">
    <template #header>
      <h2 class="text-lg font-bold uppercase">
        Підбір авто
      </h2>
    </template>

    <template #body>
      <Transition name="fade" mode="out-in">
        <component :is="quizStepsComponents[quizStore.step]" />
      </Transition>
    </template>

    <template #footer>
      <UProgress v-model="quizStore.step" :max="QUIZ_STEPS.BRAND" :ui="{ root: 'absolute -top-2 inset-x-0', base: 'rounded-none', indicator: 'rounded-none' }" />

      <UButton
        variant="link"
        color="secondary"
        icon="i-lucide-arrow-left"
        @click="quizStore.stepBack"
      >
        Назад
      </UButton>
      <UButton clock class="md:w-fit" @click="quizStore.stepForward">
        <template v-if="quizStore.isFinalStep">
          Переглянути варіанти
        </template>
        <template v-else>
          Наступний крок
        </template>
      </UButton>
    </template>
  </DrawerSlideover>
</template>
