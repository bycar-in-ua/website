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

  const stepBack = () => {
    if (step.value === QUIZ_STEPS.BODY) {
      isOpen.value = false;
      return;
    }
    step.value -= 1;
  };

  const isFinalStep = computed(() => step.value === QUIZ_STEPS.BRAND);

  const canStepForward = computed(() => {
    if (step.value === QUIZ_STEPS.BODY) {
      return Boolean(filters.value.bodyType?.length);
    }

    return true;
  });

  const stepForward = () => {
    if (!canStepForward.value) {
      return;
    }

    if (isFinalStep.value) {
      finishQuiz();
    } else {
      step.value += 1;
    }
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
    }, {
      replace: true,
      open: { target: "_self" },
    });
  };

  return {
    isOpen,
    step,
    isFinalStep,
    canStepForward,
    stepBack,
    stepForward,
    filters,
    openQuiz,
    finishQuiz,
  };
});
