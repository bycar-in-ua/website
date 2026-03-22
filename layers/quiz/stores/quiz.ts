import type { Vehicle } from "@bycar-in-ua/sdk";
import type { VehiclesFiltersSchema } from "@bycar-in-ua/vehicles-sdk";
import { defineStore } from "pinia";
import { serializeFiltersToQuery } from "~/utils/filters";

const initialFilters: VehiclesFiltersSchema = Object.freeze({
  brand: [],
  bodyType: [],
  engineType: [],
  driveType: [],
  gearboxType: [],
  minPrice: undefined,
  maxPrice: undefined,
  yearFrom: undefined,
  yearTo: undefined,
  minDisplacement: undefined,
  maxDisplacement: undefined,
  minPower: undefined,
  maxPower: undefined,
  availability: undefined,
  productionRelevance: undefined,
});

export const useQuizStore = defineStore("quiz", () => {
  const isOpen = ref(false);
  const step = ref(0);
  const isUserKnow = ref<boolean | null>(null);
  const filters = ref<VehiclesFiltersSchema>({ ...initialFilters });

  const resetState = () => {
    step.value = 0;
    isUserKnow.value = null;
    filters.value = { ...initialFilters };
  };

  const { gtag } = useGtag();

  const canFinishQuiz = computed(() => {
    return Boolean(
      filters.value.bodyType?.length
      || filters.value.driveType?.length
      || filters.value.engineType?.length
      || filters.value.minPrice
      || filters.value.maxPrice,
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

    const query = serializeFiltersToQuery(filters.value);

    gtag("event", "quiz_finished", {
      event_category: "quiz",
      event_label: "finished",
    });

    isOpen.value = false;
    resetState();

    navigateTo({
      name: "catalog",
      query,
    }, { replace: true });
  };

  const selectModel = (car: Vehicle) => {
    navigateTo({
      name: "SingleCar",
      params: { slug: car.slug },
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
    field: keyof VehiclesFiltersSchema,
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
    resetState,
    selectModel,
    checkHandler,
  };
});
