<script setup lang="ts">
import { useQuizStore } from "#layers/quiz/stores/quiz";

const quizStore = useQuizStore();
</script>

<template>
  <UButton
    size="sm"
    @click="quizStore.openQuiz"
  >
    Підбір авто
  </UButton>
</template>
