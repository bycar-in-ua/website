<script setup lang="ts">
import {
  priceTemplates,
  MIN_PRICE,
  MAX_PRICE,
  PRICE_STEP,
} from "#shared/priceTemplates";

import QuestionContainer from "./QuestionContainer.vue";
import QuizButton from "./QuizButton.vue";

const quizStore = useQuizStore();

const priceSliderModel = computed({
  get: () => [
    Number(quizStore.filters.priceFrom ?? 0),
    Number(quizStore.filters.priceTo ?? Infinity),
  ],
  set: ([from, to]: number[]) => {
    quizStore.filters.priceFrom = from;

    if (Number.isFinite(to)) {
      quizStore.filters.priceTo = to;
    }
  },
});

const maxPriceFrom = computed(() => {
  return quizStore.filters.priceTo
    ? quizStore.filters.priceTo - PRICE_STEP
    : MAX_PRICE;
});
const minPriceTo = computed(() => {
  return quizStore.filters.priceFrom
    ? quizStore.filters.priceFrom + PRICE_STEP
    : MIN_PRICE;
});

const availablePriceFrom = computed(() => {
  const value = quizStore.filters.priceTo;

  return value
    ? [...priceTemplates].filter((item) => item.value < value)
    : [...priceTemplates];
});

const availablePriceTo = computed(() => {
  const value = quizStore.filters.priceFrom;

  return value
    ? [...priceTemplates].filter((item) => item.value > value)
    : [...priceTemplates];
});
</script>

<template>
  <QuestionContainer step="Крок 1/3" title="Обери бюджет:">
    <div class="flex gap-2 items-center mb-8">
      <UInputNumber
        v-model="quizStore.filters.priceFrom"
        size="lg"
        :step="PRICE_STEP"
        :min="MIN_PRICE"
        :max="maxPriceFrom"
        class="flex-grow"
        :format-options="{
          style: 'currency',
          currency: 'USD',
          currencyDisplay: 'symbol',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }"
      />
      <span class="basis-2">-</span>
      <UInputNumber
        v-model="quizStore.filters.priceTo"
        size="lg"
        :step="PRICE_STEP"
        :min="minPriceTo"
        :max="MAX_PRICE"
        class="flex-grow"
        :format-options="{
          style: 'currency',
          currency: 'USD',
          currencyDisplay: 'symbol',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }"
      />
    </div>

    <USlider
      v-model="priceSliderModel"
      :min="MIN_PRICE"
      :max="MAX_PRICE"
      :step="PRICE_STEP"
      class="mb-8"
    />

    <div class="grid gap-4 xs:gap-6 xs:grid-cols-2">
      <div class="flex items-center grow gap-4">
        <UFormField label="Від:" class="w-full">
          <USelectMenu
            v-model="quizStore.filters.priceFrom"
            :items="availablePriceFrom"
            class="w-full"
            :search-input="false"
            value-key="value"
          />
        </UFormField>
      </div>

      <div class="flex items-center grow gap-4">
        <UFormField label="До:" class="w-full">
          <USelectMenu
            v-model="quizStore.filters.priceTo"
            :items="availablePriceTo"
            class="w-full"
            :search-input="false"
            value-key="value"
          />
        </UFormField>
      </div>
    </div>

    <template #footer>
      <QuizButton variant="outline" @click="quizStore.$reset()">
        Назад
      </QuizButton>
      <QuizButton @click="quizStore.step += 1">
        Далі
      </QuizButton>
    </template>
  </QuestionContainer>
</template>
