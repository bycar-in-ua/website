import { defineStore } from "pinia";

type QuizState = {
  isUserKnow: boolean | null;
  step: number;
  filters: FiltersState;
};

const initialState = {
  isUserKnow: null,
  step: 0,
  filters: {
    brand: [],
    bodyType: [],
    engineType: [],
    drive: [],
  },
};

export const useQuizStore = defineStore("quiz", {
  state: (): QuizState => JSON.parse(JSON.stringify(initialState)),

  actions: {
    resetState() {
      // this.$state.filters.priceFrom = undefined;
      // this.$state.filters.priceTo = undefined;
      this.$state = JSON.parse(JSON.stringify(initialState));
    },
  },
});
