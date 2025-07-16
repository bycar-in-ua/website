<script setup lang="ts">
import type { CheckboxProps } from "@nuxt/ui";
import type { VehiclesFilters } from "@bycar-in-ua/sdk";
import QuestionContainer from "./QuestionContainer.vue";
import QuizButton from "./QuizButton.vue";
import PriceStep from "./PriceStep.vue";
import ModelsStep from "./ModelsStep.vue";

const isOpen = ref(false);

const { t } = useI18n();
const { gtag } = useGtag();

const quizStore = useQuizStore();
const catalogStore = useCatalogStore();

const openModal = () => {
  quizStore.$reset();

  isOpen.value = true;

  gtag("event", "quiz_open", {
    event_category: "quiz",
    event_label: "open",
  });
};

function checkHandler<TValue extends string | number>(
  field: keyof FiltersState,
  checked: boolean | "indeterminate",
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
  if (quizStore.filters.brand?.length === 1 && quizStore.step === 0) {
    quizStore.step += 1;
    return;
  }

  const query = Object.entries(quizStore.filters)
    .reduce((acc, [key, value]) => {
      if (key === "priceFrom" || key === "priceTo") {
        acc.push(`${key}=${value}`);
        return acc;
      }

      if (Array.isArray(value) && value.length) {
        acc.push(`${key}=${value.join(",")}`);
      }

      return acc;
    }, [] as string[])
    .join("&");

  gtag("event", "quiz_finished", {
    event_category: "quiz",
    event_label: "finished",
  });

  isOpen.value = false;
  quizStore.$reset();
  navigateTo(`catalog?${query}`);
}

const engineTypes: NonNullable<VehiclesFilters["engineType"]> = [
  "gas",
  "dt",
  "hybrid",
  "electric",
];

const checkboxUi: CheckboxProps["ui"] = {
  root: "items-center",
  label:
    "text-md sm:text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-200",
};
</script>

<template>
  <UModal
    v-model:open="isOpen"
    fullscreen
    :ui="{ body: 'flex flex-col items-center justify-center' }"
  >
    <slot name="trigger" :open="openModal" />

    <template #body>
      <UCard
        :ui="{
          root: 'ring-0 w-full max-w-2xl flex-grow flex flex-col',
          body: 'p-0 sm:p-0 flex-grow flex flex-col justify-center',
        }"
      >
        <div class="flex flex-col items-center justify-center flex-grow">
          <QuestionContainer
            v-if="quizStore.isUserKnow === null"
            step="Крок 1"
            title="Вже знаєш, яке авто хочеш?"
          >
            <div class="grid sm:grid-cols-2 gap-4">
              <QuizButton block @click="quizStore.isUserKnow = true">
                Так
              </QuizButton>
              <QuizButton block @click="quizStore.isUserKnow = false">
                Ні
              </QuizButton>
            </div>

            <template #extra>
              <p class="mt-2 mb-auto xs:mb-0 text-center">
                Невелике оптування, щоб ми зрозуміли яке авто підходить для
                тебе.
              </p>
            </template>
          </QuestionContainer>

          <QuestionContainer
            v-if="quizStore.isUserKnow === true && quizStore.step === 0"
            step="Крок 2/2"
            title="Обери бренд:"
          >
            <div class="flex flex-col gap-4">
              <UCheckbox
                v-for="brand in catalogStore.dictionary.brands"
                :key="brand.id"
                :label="brand.displayName"
                :value="brand.id"
                :model-value="quizStore.filters.brand?.includes(brand.id)"
                :ui="checkboxUi"
                size="xl"
                @update:model-value="
                  (checked) => checkHandler('brand', checked, brand.id)
                "
              />
            </div>

            <template #footer>
              <QuizButton variant="outline" @click="quizStore.$reset()">
                Назад
              </QuizButton>
              <QuizButton
                :disabled="!quizStore.filters.brand?.length"
                @click="finishQuiz"
              >
                Далі
              </QuizButton>
            </template>
          </QuestionContainer>

          <ModelsStep
            v-if="quizStore.isUserKnow === true && quizStore.step === 1"
            @finish="finishQuiz()"
          />

          <PriceStep
            v-if="quizStore.isUserKnow === false && quizStore.step === 0"
          />

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
                :model-value="quizStore.filters.bodyType?.includes(bodyType)"
                :ui="checkboxUi"
                size="xl"
                @update:model-value="
                  (checked) => checkHandler('bodyType', checked, bodyType)
                "
              />
            </div>

            <template #footer>
              <div class="flex justify-end gap-2 mt-auto xs:mt-6">
                <QuizButton variant="outline" @click="quizStore.step -= 1">
                  Назад
                </QuizButton>
                <QuizButton @click="quizStore.step += 1"> Далі </QuizButton>
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
                :model-value="
                  quizStore.filters.engineType?.includes(engineType)
                "
                :ui="checkboxUi"
                size="xl"
                @update:model-value="
                  (checked) => checkHandler('engineType', checked, engineType)
                "
              />
            </div>

            <template v-if="!quizStore.canFinishQuiz" #extra>
              <p class="text-center mt-2">
                Схоже, що не було вибрано жодного фільтру. В такому випадку цей
                помічник не зможе нічим допомогти.
              </p>
            </template>

            <template #footer>
              <div class="flex justify-end gap-2 mt-auto xs:mt-6">
                <QuizButton variant="outline" @click="quizStore.step -= 1">
                  Назад
                </QuizButton>
                <QuizButton
                  :disabled="!quizStore.canFinishQuiz"
                  @click="finishQuiz"
                >
                  Далі
                </QuizButton>
              </div>
            </template>
          </QuestionContainer>
        </div>
      </UCard>
    </template>
  </UModal>
</template>
