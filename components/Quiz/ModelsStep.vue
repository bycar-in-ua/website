<script setup lang="ts">
import CarCard from "@/components/UI/CarCard/CarCard.vue";
import QuestionContainer from "./QuestionContainer.vue";
import Pagination from "../UI/Pagination.vue";

const { $bycarApi } = useNuxtApp();

const quizStore = useQuizStore();

const pagination = ref({
  page: 1,
  limit: 9,
});

const { data, refresh } = useAsyncData(
  "search-cars-by-brand",
  () =>
    $bycarApi.searchVehicles({
      filters: {
        brand: quizStore.filters.brand,
      },
      pagination: pagination.value,
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
    immediate: true,
  },
);
</script>

<template>
  <QuestionContainer title="Обери свою модель:">
    <div class="flex flex-col gap-4">
      <div
        class="cards-container grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 lg:gap-5"
      >
        <NuxtLink
          v-for="car in data.items"
          :key="car.id"
          :to="{
            name: 'SingleCar',
            params: {
              brand: car.brand?.slug ?? '',
              model: car.slug,
            },
          }"
        >
          <CarCard :car="car" />
        </NuxtLink>
      </div>

      <Pagination
        class="mt-10 justify-center"
        :page="pagination.page"
        :pagination="data.meta"
        @update:page="
          (page) => {
            pagination.page = page;
            refresh();
          }
        "
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
      </div>
    </template>
  </QuestionContainer>
</template>
