<script setup lang="ts">
import QuestionContainer from "./QuestionContainer.vue";
import QuizButton from "./QuizButton.vue";
import CdnImage from "../CdnImage.vue";
import { getPriceRange } from "../UI/CarCard/helpers";

const { $bycarApi } = useNuxtApp();

const quizStore = useQuizStore();

const { data } = useAsyncData(
  "search-cars-by-brand",
  () =>
    $bycarApi.searchVehicles({
      filters: {
        brand: quizStore.filters.brand,
      },
      pagination: {
        page: 1,
        limit: 100,
      },
    }),
  {
    default: () => ({
      items: [],
      meta: {
        currentPage: 1,
        totalPages: 0,
        itemsPerPage: 0,
        totalItems: 0,
      },
    }),
  },
);

const emit = defineEmits(["finish"]);
</script>

<template>
  <QuestionContainer title="Обери свою модель:">
    <div class="models-list-wrapper overflow-y-auto pr-2">
      <NuxtLink
        v-for="car in data.items"
        :key="car.id"
        class="pb-4 mb-4 flex items-center gap-2 border-b"
        :to="{
          name: 'SingleCar',
          params: {
            brand: car.brand?.slug ?? '',
            model: car.slug,
          },
        }"
      >
        <div>
          <span class="font-semibold">{{ car.model }}</span>
          <br />
          <span class="text-xs sm:text-sm">
            {{ getPriceRange(car.complectations) }}
          </span>
        </div>

        <CdnImage
          v-if="car.featureImage"
          size="thumbnail"
          :src="car.featureImage.path"
          class="w-16 h-12 sm:w-20 sm:h-16 lg:w-24 lg:h-20 object-cover rounded-lg ml-auto"
          :alt="car.model"
          :title="car.model"
        />
      </NuxtLink>
    </div>

    <template #footer>
      <QuizButton variant="outline" @click="quizStore.step -= 1">
        Назад
      </QuizButton>
      <QuizButton
        :disabled="!quizStore.filters.brand?.length"
        @click="emit('finish')"
      >
        Переглянути весь каталог
      </QuizButton>
    </template>
  </QuestionContainer>
</template>

<style>
.models-list-wrapper {
  max-height: calc(100vh - 350px);
}
</style>
