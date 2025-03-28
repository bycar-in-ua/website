<script setup lang="ts">
import { priceTemplates } from "./priceTemplates";
import QuestionContainer from "./QuestionContainer.vue";
import QuizButton from "./QuizButton.vue";
import Slider from "@/components/UI/Slider.vue";

const quizStore = useQuizStore();

const priceSliderModel = computed({
  get: () => [
    Number(quizStore.filters.priceFrom ?? 0),
    Number(quizStore.filters.priceTo ?? Infinity),
  ],
  set: ([from, to]: number[]) => {
    quizStore.updatePriceFrom(from);

    if (isFinite(to)) {
      quizStore.updatePriceTo(to);
    }
  },
});

const availablePriceFrom = computed(() => {
  const value = quizStore.filters.priceTo;

  return value
    ? [...priceTemplates].filter((item) => item.value < value)
    : [...priceTemplates];
});

const availablePriceTo = computed(() => {
  const value = quizStore.filters.priceFrom;

  return (
    value
      ? [...priceTemplates].filter((item) => item.value > value)
      : [...priceTemplates]
  ).reverse();
});
</script>

<template>
  <QuestionContainer step="Крок 1/3" title="Обери бюджет:">
    <div class="flex flex-col gap-4">
      <div class="flex gap-2 items-center mb-4 pl-1 pt-1">
        <UInput
          :model-value="quizStore.filters.priceFrom"
          size="lg"
          type="number"
          :step="5000"
          :min="15000"
          :max="200000"
          class="flex-grow"
          @update:model-value="quizStore.updatePriceFrom"
        />
        <span>-</span>
        <UInput
          :model-value="quizStore.filters.priceTo"
          size="lg"
          type="number"
          :step="5000"
          :min="15000"
          :max="200000"
          class="flex-grow"
          @update:model-value="quizStore.updatePriceTo"
        />
        <span>$</span>
      </div>

      <Slider
        v-model="priceSliderModel"
        :min="15000"
        :max="200000"
        :step="5000"
        :size="6"
        class="h-3"
      />
    </div>

    <div class="flex gap-4 flex-wrap md:flex-nowrap mt-10">
      <div class="flex items-center grow gap-4">
        <span class="w-8"> Від: </span>
        <USelect
          v-model="quizStore.filters.priceFrom"
          :options="availablePriceFrom"
          class="w-full"
          @change="(value: number | undefined) => (quizStore.filters.priceFrom = value)"
        />
      </div>

      <div class="flex items-center grow gap-4">
        <span class="w-8"> До: </span>
        <USelect
          v-model="quizStore.filters.priceTo"
          :options="availablePriceTo"
          class="w-full"
          @change="(value: number | undefined) => (quizStore.filters.priceTo = value)"
        />
      </div>
    </div>

    <template #footer>
      <QuizButton variant="outline" @click="quizStore.$reset()">
        Назад
      </QuizButton>
      <QuizButton @click="quizStore.step += 1"> Далі </QuizButton>
    </template>
  </QuestionContainer>
</template>
