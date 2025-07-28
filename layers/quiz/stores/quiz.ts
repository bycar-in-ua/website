import type { Vehicle } from "@bycar-in-ua/sdk";
import { defineStore } from "pinia";
import type { LocationQueryRaw } from "vue-router";
import type { FiltersState } from "~/shared/types";

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
  const step = ref(0);
  const isUserKnow = ref<boolean | null>(null);
  const filters = ref<FiltersState>({ ...initialFilters });

  const resetState = () => {
    step.value = 0;
    isUserKnow.value = null;
    filters.value = { ...initialFilters };
  };

  const { gtag } = useGtag();

  const canFinishQuiz = computed(() => {
    return Boolean(
      filters.value.bodyType?.length ||
      filters.value.drive?.length ||
      filters.value.engineType?.length ||
      filters.value.priceFrom ||
      filters.value.priceTo,
    );
  });

  const openQuiz = () => {
    resetState();

    isOpen.value = true;

    gtag("event", "quiz_open", {
      event_category: "quiz",
      event_label: "open",
    });
  };

  const finishQuiz = () => {
    if (filters.value.brand?.length === 1 && step.value === 0) {
      step.value += 1;
      return;
    }

    const query: LocationQueryRaw = Object.entries(filters.value).reduce(
      (acc, [key, value]) => {
        if ((key === "priceFrom" || key === "priceTo") && !!value) {
          acc[key] = value;
          return acc;
        }

        if (Array.isArray(value) && value.length) {
          acc[key] = value.join(",");
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
    resetState();

    navigateTo({ name: "catalog", query }, { replace: true });
  };

  const selectModel = (car: Vehicle) => {
    navigateTo({
      name: "SingleCar",
      params: {
        brand: car.brand!.slug,
        model: car.slug,
      },
    });

    isOpen.value = false;
    resetState();

    gtag("event", "model_selected", {
      event_category: "quiz",
      event_label: "model_selected",
      value: car.slug,
    });
  };

  const checkHandler = <TValue extends string | number>(
    field: keyof FiltersState,
    checked: boolean | "indeterminate",
    value: TValue,
  ) => {
    const existedValue = filters.value[field] ?? [];

    if (!Array.isArray(existedValue)) {
      return;
    }

    if (checked) {
      filters.value = {
        ...filters.value,
        [field]: [...existedValue, value],
      };
    } else {
      filters.value = {
        ...filters.value,
        [field]: existedValue.filter((item) => item !== value),
      };
    }
  };

  return {
    isOpen,
    step,
    isUserKnow,
    filters,
    canFinishQuiz,
    openQuiz,
    finishQuiz,
    selectModel,
    checkHandler,
  };
});
