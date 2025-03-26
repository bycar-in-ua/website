<script setup lang="ts">
import { priceFromTemplates, priceToTemplates } from "~/constants/quizPrice";
import QuestionContainer from "./QuestionContainer.vue";
import Slider from "@/components/UI/Slider.vue";

const quizStore = useQuizStore();

const updatePriceFrom = (value?: number) => {
  if (
    typeof value !== "number" ||
    (quizStore.filters.priceTo && value > quizStore.filters.priceTo)
  ) {
    quizStore.filters.priceFrom = 0;
    return;
  }

  quizStore.filters.priceFrom = value > 0 ? value : 0;
};

const updatePriceTo = (value?: number | number) => {
  if (
    typeof value !== "number" ||
    (quizStore.filters.priceFrom && value < quizStore.filters.priceFrom)
  ) {
    quizStore.filters.priceTo = undefined;
    return;
  }

  quizStore.filters.priceTo = value > 0 ? value : 0;
};

const priceSliderModel = computed({
  get: () => [
    Number(quizStore.filters.priceFrom ?? 0),
    Number(quizStore.filters.priceTo ?? Infinity),
  ],
  set: ([from, to]: number[]) => {
    updatePriceFrom(from);

    if (isFinite(to)) {
      updatePriceTo(to);
    }
  },
});

const availablePriceFrom = computed(() => {
  const value = quizStore.filters.priceTo;

  return value
    ? priceFromTemplates.filter((item) => item.value < value)
    : priceFromTemplates;
});

const availablePriceTo = computed(() => {
  const value = quizStore.filters.priceFrom;

  return value
    ? priceToTemplates.filter((item) => item.value > value)
    : priceToTemplates;
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
          :step="1000"
          :min="0"
          :max="200000"
          class="flex-grow"
          @update:model-value="updatePriceFrom"
        />
        <span>-</span>
        <UInput
          :model-value="quizStore.filters.priceTo"
          size="lg"
          type="number"
          :step="1000"
          :min="1000"
          :max="200000"
          class="flex-grow"
          @update:model-value="updatePriceTo"
        />
        <span>$</span>
      </div>

      <Slider
        v-model="priceSliderModel"
        :min="0"
        :max="200000"
        :step="1000"
        :size="6"
        class="h-3"
      />
    </div>

    <div class="flex justify-between mt-10">
      <div class="flex items-center gap-4">
        Від:
        <USelect
          v-model="quizStore.filters.priceFrom"
          :options="availablePriceFrom"
          class="w-40"
          @change="(value: number | undefined) => (quizStore.filters.priceFrom = value)"
        />
      </div>

      <div class="flex items-center gap-4">
        До:
        <USelect
          v-model="quizStore.filters.priceTo"
          :options="availablePriceTo"
          class="w-40"
          @change="(value: number | undefined) => (quizStore.filters.priceTo = value)"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-2 mt-auto xs:mt-6">
        <UButton
          class="flex justify-center text-xl"
          variant="outline"
          @click="quizStore.resetState()"
        >
          Назад
        </UButton>
        <UButton
          class="flex justify-center text-xl"
          @click="quizStore.step += 1"
        >
          Далі
        </UButton>
      </div>
    </template>
  </QuestionContainer>
</template>
