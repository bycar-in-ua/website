<script setup lang="ts">
import type { EngineType } from "@bycar-in-ua/vehicles-sdk";
import SelectionCard from "~/components/UI/SelectionCard.vue";
import { useQuizStore } from "../stores/quiz";
import StepContainer from "./StepContainer.vue";

type EngineOption = {
  value: EngineType;
  label: string;
};

const enginesOptions: EngineOption[] = [
  {
    value: "gas",
    label: "Бензин",
  },
  {
    value: "dt",
    label: "Дизель",
  },
  {
    value: "electric",
    label: "Електро",
  },
  {
    value: "hybrid",
    label: "Гібрид",
  },
];

const quizStore = useQuizStore();

const checkHandler = (value: EngineType) => {
  if (quizStore.filters.engineType?.includes(value)) {
    quizStore.filters.engineType = quizStore.filters.engineType?.filter((v) => v !== value);
  } else {
    quizStore.filters.engineType?.push(value);
  }
};
</script>

<template>
  <StepContainer title="2. Який двигун оберемо для авто?" subtitle="Впливає на потужність та економічність авто.">
    <div class="space-y-3">
      <SelectionCard
        v-for="option in enginesOptions"
        :key="option.value"
        :title="option.label"
        :selected="quizStore.filters.engineType?.includes(option.value)"
        indicator-type="check"
        @click="checkHandler(option.value)"
      />
    </div>
  </StepContainer>
</template>
