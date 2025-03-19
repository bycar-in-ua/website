<script setup lang="ts">
import type { VehiclesFilters } from "@bycar-in-ua/sdk";
import QuestionContainer from "./QuestionContainer.vue";
import Slider from "../Slider.vue";

const isOpen = ref(false);

const { t } = useI18n();

const quizStore = useQuizStore();
const catalogStore = useCatalogStore();

function checkHandler<TValue extends string | number>(
  field: keyof FiltersState,
  checked: boolean,
  value: TValue,
) {
  const existedValue = quizStore.filters[field] ?? [];

  if (!Array.isArray(existedValue)) {
    return;
  }

  if (checked) {
    quizStore.filters = {
      ...quizStore.filters,
      [field]: [...existedValue, value],
    };
  } else {
    quizStore.filters = {
      ...quizStore.filters,
      [field]: existedValue.filter((item) => item !== value),
    };
  }
}

function finishQuiz() {
  const query = Object.entries(quizStore.filters).reduce(
    (acc, [key, value]) => {
      if (key === "priceFrom" || key === "priceTo") {
        return (acc += `${key}=${value}&`);
      }

      if (!Array.isArray(value)) {
        return acc;
      }

      if (!value.length) {
        return acc;
      }

      return (acc += `${key}=${value.join(",")}&`);
    },
    "",
  );
  // console.log("catalogStore.filters", catalogStore.filters);

  // catalogStore.filters = { ...catalogStore.filters, ...quizStore.filters };

  // navigateTo("catalog");
  isOpen.value = false;
  quizStore.resetState();
  navigateTo(`catalog?${query}`);
}

const engineTypes: NonNullable<VehiclesFilters["engineType"]> = [
  "gas",
  "dt",
  "hybrid",
  "electric",
];

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
</script>

<template>
  <UButton
    icon="i-heroicons-magnifying-glass"
    trailing
    class="w-full sm:w-auto flex justify-center items-center"
    size="xl"
    @click="isOpen = true"
  >
    <slot />
  </UButton>

  <UModal v-model="isOpen" fullscreen>
    <UCard
      :ui="{
        base: 'h-full flex flex-col',
        rounded: '',
        body: {
          base: 'flex justify-center grow',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-end">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>

      <div
        class="flex flex-col items-center justify-center h-full w-full max-w-2xl"
      >
        <QuestionContainer
          v-if="quizStore.isUserKnow === null"
          step="Крок 1"
          title="Вже знаєш яке авто хочеш?"
        >
          <div class="flex flex-col sm:flex-row gap-4">
            <UButton
              class="flex grow justify-center text-xl"
              @click="quizStore.isUserKnow = true"
            >
              Так
            </UButton>
            <UButton
              class="flex grow justify-center text-xl"
              @click="quizStore.isUserKnow = false"
            >
              Ні
            </UButton>
          </div>

          <template #footer>
            <p class="mt-2 text-center">
              Невелике оптування, щоб ми зрозуміли яке авто підходить для тебе.
            </p>
          </template>
        </QuestionContainer>

        <QuestionContainer
          v-if="quizStore.isUserKnow === true"
          step="Крок 2/2"
          title="Обери бренд:"
          description=""
        >
          <div class="flex flex-col gap-4">
            <UCheckbox
              v-for="brand in catalogStore.dictionary.brands"
              :key="brand.id"
              :label="brand.displayName"
              :value="brand.id"
              :model-value="quizStore.filters.brand"
              :ui="{
                wrapper: 'flex items-center ',
                base: 'h-8 w-8',
                label: 'text-2xl font-medium text-gray-700 dark:text-gray-200',
              }"
              @change="(checked: boolean) => checkHandler('brand', checked, brand.id)"
            />
          </div>

          <template #footer>
            <div class="flex justify-end gap-2 mt-6">
              <UButton
                class="flex justify-center text-xl"
                variant="outline"
                @click="quizStore.resetState()"
              >
                Назад
              </UButton>
              <UButton class="flex justify-center text-xl" @click="finishQuiz">
                Далі
              </UButton>
            </div>
          </template>
        </QuestionContainer>

        <QuestionContainer
          v-if="quizStore.isUserKnow === false && quizStore.step === 0"
          step="Крок 1/3"
          title="Обери бюджет:"
        >
          <div class="flex flex-col gap-4">
            <div class="flex gap-2 items-center mb-4 pl-1 pt-1">
              <UInput
                :model-value="quizStore.filters.priceFrom"
                size="xs"
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
                size="xs"
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
              class="h-3"
            />
          </div>

          <template #footer>
            <div class="flex justify-end gap-2 mt-6">
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

        <QuestionContainer
          v-if="quizStore.isUserKnow === false && quizStore.step === 1"
          step="Крок 2/3"
          title="Обери тип кузова:"
        >
          <div class="flex flex-col gap-4">
            <UCheckbox
              v-for="bodyType in catalogStore.dictionary.bodyTypes"
              :key="bodyType"
              :label="t(`vehicle.bodyTypes.items.${bodyType}`)"
              :value="bodyType"
              :model-value="quizStore.filters.bodyType"
              :ui="{
                wrapper: 'flex items-center ',
                base: 'h-8 w-8',
                label: 'text-2xl font-medium text-gray-700 dark:text-gray-200',
              }"
              @change="(checked: boolean) => checkHandler('bodyType', checked, bodyType)"
            />
          </div>

          <template #footer>
            <div class="flex justify-end gap-2 mt-6">
              <UButton
                class="flex justify-center text-xl"
                variant="outline"
                @click="quizStore.step -= 1"
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

        <QuestionContainer
          v-if="quizStore.isUserKnow === false && quizStore.step === 2"
          step="Крок 3/3"
          title="Обери тип двигуна:"
        >
          <div class="flex flex-col gap-4">
            <UCheckbox
              v-for="engineType in engineTypes"
              :key="engineType"
              :label="t(`filters.engineType.${engineType}`)"
              :value="engineType"
              :model-value="quizStore.filters.engineType"
              :ui="{
                wrapper: 'flex items-center ',
                base: 'h-8 w-8',
                label: 'text-2xl font-medium text-gray-700 dark:text-gray-200',
              }"
              @change="(checked: boolean) => checkHandler('engineType', checked, engineType)"
            />
          </div>

          <template #footer>
            <div class="flex justify-end gap-2 mt-6">
              <UButton
                class="flex justify-center text-xl"
                variant="outline"
                @click="quizStore.step -= 1"
              >
                Назад
              </UButton>
              <UButton class="flex justify-center text-xl" @click="finishQuiz">
                Далі
              </UButton>
            </div>
          </template>
        </QuestionContainer>
      </div>
    </UCard>
  </UModal>
</template>
