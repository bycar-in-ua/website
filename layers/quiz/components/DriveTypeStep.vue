<script setup lang="ts">
import SelectionCard from "~/components/UI/SelectionCard.vue";
import { useQuizStore } from "../stores/quiz";
import StepContainer from "./StepContainer.vue";

type DriveOption = {
  value: string;
  label: string;
};

const enginesOptions: DriveOption[] = [
  {
    value: "fwd",
    label: "Передній",
  },
  {
    value: "rwd",
    label: "Задній",
  },
  {
    value: "awd",
    label: "Повний",
  },
];

const quizStore = useQuizStore();

const checkHandler = (value: string) => {
  if (quizStore.filters.driveType?.includes(value)) {
    quizStore.filters.driveType = quizStore.filters.driveType?.filter((v) => v !== value);
  } else {
    quizStore.filters.driveType?.push(value);
  }

  if (quizStore.filters.driveType?.length === 3) {
    quizStore.filters.driveType = [];
  }
};
</script>

<template>
  <StepContainer title="3. Який тип приводу оберете?" subtitle="Від цього залежить керованість у різних умовах.">
    <div class="space-y-3" data-testid="quiz-drive-list">
      <SelectionCard
        title="Всі"
        :selected="!quizStore.filters.driveType || quizStore.filters.driveType.length === 0"
        indicator-type="check"
        @click="quizStore.filters.driveType = []"
      />

      <SelectionCard
        v-for="option in enginesOptions"
        :key="option.value"
        :title="option.label"
        :selected="quizStore.filters.driveType?.includes(option.value)"
        indicator-type="check"
        @click="checkHandler(option.value)"
      />
    </div>
  </StepContainer>
</template>
