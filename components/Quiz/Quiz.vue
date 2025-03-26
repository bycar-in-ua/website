<script setup lang="ts">
import type { VehiclesFilters } from "@bycar-in-ua/sdk";
import QuestionContainer from "./QuestionContainer.vue";
import PriceStep from "./PriceStep.vue";
import ModelsStep from "./ModelsStep.vue";

const isOpen = ref(false);

const { t } = useI18n();

const quizStore = useQuizStore();
const catalogStore = useCatalogStore();

const openModal = () => {
  isOpen.value = true;
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

function finishQuiz(_: Event, model?: string) {
  if (quizStore.filters.brand?.length === 1 && !model) {
    quizStore.step += 1;
    return;
  }

  if (quizStore.filters.brand?.length === 1 && model) {
    isOpen.value = false;
    quizStore.resetState();
    navigateTo(`${quizStore.filters.brand[0]}/${model}`);
    return;
  }

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
</script>

<template>
  <slot name="trigger" :open="openModal">
    <UButton
      icon="i-heroicons-magnifying-glass"
      trailing
      class="w-full sm:w-auto flex justify-center items-center"
      size="xl"
      @click="isOpen = true"
    >
      Пошук авто
    </UButton>
  </slot>

  <UModal v-model="isOpen" fullscreen>
    <UCard
      :ui="{
        base: 'h-fit flex flex-col grow',
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
          title="Вже знаєш, яке авто хочеш?"
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
              :ui="{
                wrapper: 'flex items-center ',
                base: 'h-8 w-8',
                label: 'text-2xl font-medium text-gray-700 dark:text-gray-200',
              }"
              @change="(checked: boolean) => checkHandler('brand', checked, brand.id)"
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
              <UButton class="flex justify-center text-xl" @click="finishQuiz">
                Далі
              </UButton>
            </div>
          </template>
        </QuestionContainer>

        <ModelsStep
          v-if="quizStore.isUserKnow === true && quizStore.step === 1"
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
              :ui="{
                wrapper: 'flex items-center ',
                base: 'h-8 w-8',
                label: 'text-2xl font-medium text-gray-700 dark:text-gray-200',
              }"
              @change="(checked: boolean) => checkHandler('bodyType', checked, bodyType)"
            />
          </div>

          <template #footer>
            <div class="flex justify-end gap-2 mt-auto xs:mt-6">
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
            <div class="flex justify-end gap-2 mt-auto xs:mt-6">
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
