<script setup lang="ts">
import SelectionCard from "~/components/UI/SelectionCard.vue";
import { useBrands } from "~/composables/useBrands";
import { useQuizStore } from "../stores/quiz";
import StepContainer from "./StepContainer.vue";

const { data: brands } = useBrands();

const quizStore = useQuizStore();

const checkHandler = (value: number) => {
  if (quizStore.filters.brand?.includes(value)) {
    quizStore.filters.brand = quizStore.filters.brand?.filter((v) => v !== value);
  } else {
    quizStore.filters.brand?.push(value);
  }

  if (quizStore.filters.brand?.length === brands.value?.length) {
    quizStore.filters.brand = [];
  }
};
</script>

<template>
  <StepContainer title="5. Які марки хочете розглянути?" subtitle="Можна обрати декілька або подивитися всі авто.">
    <div class="space-y-3" data-testid="quiz-brand-list">
      <SelectionCard
        title="Всі"
        :selected="quizStore.filters.brand?.length === 0"
        indicator-type="check"
        @click="quizStore.filters.brand = []"
      />

      <SelectionCard
        v-for="brand in brands"
        :key="brand.id"
        :title="brand.displayName"
        :selected="quizStore.filters.brand?.includes(brand.id)"
        indicator-type="check"
        @click="checkHandler(brand.id)"
      />
    </div>
  </StepContainer>
</template>
