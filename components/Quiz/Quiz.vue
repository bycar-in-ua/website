<script setup lang="ts">
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

const checkboxUi = {
  wrapper: "flex items-center",
  label:
    "text-md sm:text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-200",
};
</script>

<template>
  <UModal v-model:open="isOpen" fullscreen :ui="{ fullscreen: 'h-[100dvh]' }">
    <slot name="trigger" :open="openModal">
      <UButton
        icon="i-heroicons-magnifying-glass"
        trailing
        class="w-full sm:w-auto flex justify-center items-center"
        size="xl"
        @click="openModal"
      >
        Пошук авто
      </UButton>
    </slot>

    <template #content>
      <UCard
        :ui="{
          base: 'h-fit flex flex-col grow',
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

        <div class="flex flex-col items-center justify-center w-full max-w-2xl">
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
                Невелике оптування, щоб ми зрозуміли яке авто підходить для тебе.
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
                :model-value="quizStore.filters.brand"
                :ui="checkboxUi"
                @change="(checked: boolean) => checkHandler('brand', checked, brand.id)"
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
                :model-value="quizStore.filters.bodyType"
                :ui="checkboxUi"
                @change="(checked: boolean) => checkHandler('bodyType', checked, bodyType)"
              />
            </div>

            <template #footer>
              <div class="flex justify-end gap-2 mt-auto xs:mt-6">
                <QuizButton variant="outline" @click="quizStore.step -= 1">
                  Назад
                </QuizButton>
                <QuizButton @click="quizStore.step += 1">
                  Далі
                </QuizButton>
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
                :ui="checkboxUi"
                @change="(checked: boolean) => checkHandler('engineType', checked, engineType)"
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
