<script setup lang="ts">
import type { CheckboxProps } from "@nuxt/ui";
import type { BodyType, VehiclesFilters } from "@bycar-in-ua/sdk";
import DrawerSlideover from "~/components/UI/DrawerSlideover.vue";
import { useQuizStore } from "#layers/quiz/stores/quiz";
import QuestionContainer from "./QuestionContainer.vue";
import QuizButton from "./QuizButton.vue";
import PriceStep from "./PriceStep.vue";
import ModelsStep from "./ModelsStep.vue";

const { t } = useI18n();

const quizStore = useQuizStore();
const { data: filtersData } = useCatalogFilters();

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
  <DrawerSlideover v-model:open="quizStore.isOpen" :ui="{ footer: 'md:flex-row md:justify-between' }">
    <template #header>
      <h2 class="text-lg font-bold uppercase">
        Підбір авто
      </h2>
    </template>

    <template #body>
      <UCard
        :ui="{
          root: 'ring-0 w-full max-w-2xl grow flex flex-col',
          body: 'p-0 sm:p-0 grow flex flex-col justify-center',
        }"
      >
        <div class="flex flex-col items-center justify-center grow">
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
                Невелике опитування, щоб ми зрозуміли яке авто підходить для
                тебе
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
                v-for="brand in filtersData?.filters.brand"
                :key="brand.id"
                :label="brand.displayName"
                :value="brand.id"
                :model-value="quizStore.filters.brand?.includes(brand.id)"
                :ui="checkboxUi"
                size="xl"
                @update:model-value="
                  (checked) =>
                    quizStore.checkHandler('brand', checked, brand.id)
                "
              />
            </div>

            <template #footer>
              <QuizButton variant="outline" @click="quizStore.$reset()">
                Назад
              </QuizButton>
              <QuizButton
                :disabled="!quizStore.filters.brand?.length"
                @click="quizStore.finishQuiz"
              >
                Далі
              </QuizButton>
            </template>
          </QuestionContainer>

          <ModelsStep
            v-if="quizStore.isUserKnow === true && quizStore.step === 1"
            @finish="quizStore.finishQuiz()"
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
                v-for="bodyType in filtersData?.filters.bodyType"
                :key="bodyType.value"
                :label="t(`vehicle.bodyTypes.items.${bodyType.value}`)"
                :value="bodyType.value"
                :model-value="quizStore.filters.bodyType?.includes(bodyType.value as BodyType)"
                :ui="checkboxUi"
                size="xl"
                @update:model-value="
                  (checked) =>
                    quizStore.checkHandler('bodyType', checked, bodyType.value)
                "
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
                :model-value="
                  quizStore.filters.engineType?.includes(engineType)
                "
                :ui="checkboxUi"
                size="xl"
                @update:model-value="
                  (checked) =>
                    quizStore.checkHandler('engineType', checked, engineType)
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
                  @click="quizStore.finishQuiz"
                >
                  Далі
                </QuizButton>
              </div>
            </template>
          </QuestionContainer>
        </div>
      </UCard>
    </template>

    <template #footer>
      <UButton
        variant="link"
        color="secondary"
        icon="i-lucide-arrow-left"
        @click="quizStore.step -= 1"
      >
        Назад
      </UButton>
      <UButton clock class="md:w-fit">
        Наступний крок
      </UButton>
    </template>
  </DrawerSlideover>
</template>
