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
  actions: {
    updatePriceFrom(value?: number) {
      if (
        typeof value !== "number" ||
        (this.filters.priceTo && value > this.filters.priceTo)
      ) {
        this.filters.priceFrom = 0;
        return;
      }

      this.filters.priceFrom = value > 0 ? value : 0;
    },

    updatePriceTo(value?: number) {
      if (
        typeof value !== "number" ||
        (this.filters.priceFrom && value < this.filters.priceFrom)
      ) {
        this.filters.priceTo = undefined;
        return;
      }

      this.filters.priceTo = value > 0 ? value : 0;
    },
  },
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
