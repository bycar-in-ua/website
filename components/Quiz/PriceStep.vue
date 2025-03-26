<script setup lang="ts">
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

const priceFromTemplates = [
  {
    value: 20_000,
    label: "20.000 $",
  },
  {
    value: 40_000,
    label: "40.000 $",
  },
  {
    value: 60_000,
    label: "60.000 $",
  },
];

const selectedPriceFromTemplate = computed(() => {
  const sameValue = priceFromTemplates.find(
    (template) => template.value === quizStore.filters.priceFrom,
  );

  if (sameValue) {
    return sameValue.value;
  }

  return undefined;
});

const priceToTemplates = [
  {
    value: 100_000,
    label: "100.000 $",
  },
  {
    value: 150_000,
    label: "150.000 $",
  },
  {
    value: 200_000,
    label: "200.000 $",
  },
];

const selectedPriceToTemplate = computed(() => {
  const sameValue = priceToTemplates.find(
    (template) => template.value === quizStore.filters.priceTo,
  );

  if (sameValue) {
    return sameValue.value;
  }

  return undefined;
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

    <div class="flex mt-10">
      <URadioGroup
        v-model="selectedPriceFromTemplate"
        legend="Від"
        :options="priceFromTemplates"
        class="w-1/2"
        :ui="{
          legend: 'text-lg font-medium text-gray-700 mb-4',
        }"
        :ui-radio="{
          wrapper: 'mb-4',
        }"
        @change="(value: number | undefined) => (quizStore.filters.priceFrom = value)"
      />

      <URadioGroup
        v-model="selectedPriceToTemplate"
        legend="До"
        :options="priceToTemplates"
        class="w-1/2"
        :ui="{
          legend: 'text-lg font-medium text-gray-700 mb-4',
        }"
        :ui-radio="{
          wrapper: 'mb-4',
        }"
        @change="(value: number | undefined) => (quizStore.filters.priceTo = value)"
      />
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
