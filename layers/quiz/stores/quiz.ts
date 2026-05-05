import { defineStore } from "pinia";
import type { LocationQueryRaw } from "vue-router";
import type { FiltersState } from "#shared/types";
import { QUIZ_STEPS, type QuizStep } from "../quiz.types";

const initialFilters: FiltersState = Object.freeze({
  brand: [],
  bodyType: [],
  engineType: [],
  drive: [],
  priceTo: undefined,
  priceFrom: undefined,
});

export const useQuizStore = defineStore("quiz", () => {
  const isOpen = ref(false);
  const step = ref<QuizStep>(QUIZ_STEPS.BODY);
  const filters = ref<FiltersState>({ ...initialFilters });

  const { gtag } = useGtag();

  const openQuiz = () => {
    isOpen.value = true;

    gtag("event", "quiz_open", {
      event_category: "quiz",
      event_label: "open",
    });
  };

  const finishQuiz = () => {
    const query: LocationQueryRaw = Object.entries(filters.value).reduce(
      (acc, [key, value]) => {
        if (Array.isArray(value) && value.length) {
          acc[key] = value.join(",");
        } else {
          if (value) {
            acc[key] = value;
          }
        }

        return acc;
      },
      {} as LocationQueryRaw,
    );

    gtag("event", "quiz_finished", {
      event_category: "quiz",
      event_label: "finished",
    });

    isOpen.value = false;
    step.value = QUIZ_STEPS.BODY;
    filters.value = { ...initialFilters };

    navigateTo({
      name: "catalog",
      query,
    }, { replace: true });
  };

  return {
    isOpen,
    step,
    filters,
    openQuiz,
    finishQuiz,
  };
});
