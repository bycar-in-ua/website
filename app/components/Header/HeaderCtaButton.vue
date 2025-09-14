<script setup lang="ts">
import { useQuizStore } from "#layers/quiz/stores/quiz";

const quizStore = useQuizStore();
</script>

<template>
  <UButton
    size="xl"
    icon="i-heroicons-arrow-up-right"
    trailing
    @click="quizStore.openQuiz"
  >
    Обрати машину
  </UButton>
</template>
