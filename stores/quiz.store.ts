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
});
