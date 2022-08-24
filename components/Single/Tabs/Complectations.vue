<template>
  <div class="flex justify-center w-full mb-4">
    <div class="flex overflow-x-auto">
      <div
        v-for="cmpl in car.complectations"
        :key="cmpl.id"
        class="cursor-pointer p-4 text-center text-lg"
        :class="currentComplectation.id == cmpl.id ? 'text-primary' : ''"
        @click="currentComplectation = cmpl"
      >
        <p class="text-xl font-bold">
          {{ cmpl.displayName }}
        </p>

        {{ cmpl.priceRange.min && "$" + cmpl.priceRange.min }}
        {{ cmpl.priceRange.max && " - $" + cmpl.priceRange.max }}
      </div>
    </div>
  </div>
  <Card :title="$t('powerUnits')" class="mb-4">
    <div
      v-for="powerUnit in currentComplectation.powerUnits"
      :key="powerUnit.id"
      class="mb-4 max-h-52 overflow-y-auto"
    >
      <pre>
    {{ powerUnit }}
    </pre
      >
    </div>
  </Card>

  <Card :title="$t('complectationOptions')">
    <div class="flex flex-wrap gap-8">
      <div v-for="optCat in optionsForRender" :key="optCat.id" class="mb-4">
        <h4>{{ optCat.displayName }}:</h4>

        <p v-for="option in optCat.options" :key="option.id">
          {{ option.displayName }}
        </p>
      </div>
    </div>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ComplectationsTab",
});
</script>

<script setup lang="ts">
import { computed } from "vue";
import {
  VehicleView as Car,
  OptionCategoryDto as OptionCategory,
} from "@/common";
import Card from "@/components/common/Card.vue";

const { $t, $api } = useNuxtApp();

const { data: optionCategories } = await $api.get<OptionCategory[]>(
  "option-categories",
);

const props = defineProps<{ car: Car }>();

const currentComplectation = useState(
  "currentComplectation",
  () => props.car.complectations[0],
);

const optionsForRender = computed<Array<OptionCategory>>(() => {
  const optCats: OptionCategory[] = [];

  Object.entries(currentComplectation.value.optionsByCategories).forEach(
    ([catId, options]) => {
      const targetCat = optionCategories.value.find(
        (optCat) => optCat.id == Number(catId),
      );
      targetCat.options = options;

      optCats.push(targetCat);
    },
  );
  return optCats;
});
</script>
