import { defineStore } from "pinia";

type QuizState = {
  isUserKnow: boolean | null;
  step: number;
  filters: FiltersState;
};

const initialState: QuizState = {
  isUserKnow: null,
  step: 0,
  filters: {
    brand: [],
    bodyType: [],
    engineType: [],
    drive: [],
    priceTo: undefined,
    priceFrom: undefined,
  },
};

export const useQuizStore = defineStore("quiz", {
  state: (): QuizState => JSON.parse(JSON.stringify(initialState)),
  getters: {
    canFinishQuiz(state) {
      return Boolean(
        state.filters.bodyType?.length ||
        state.filters.drive?.length ||
        state.filters.engineType?.length ||
        state.filters.priceFrom ||
        state.filters.priceTo,
      );
    },
  },
});
