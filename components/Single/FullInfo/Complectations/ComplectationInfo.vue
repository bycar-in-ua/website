<script setup lang="ts">
import type {
  ComplectationView as Complectation,
  OptionCategoryDto as OptionCategory,
} from "@bycar-in-ua/common";
import PowerUnitInfo from "./PowerUnitInfo.vue";
import OptionsList from "./OptionsList.vue";
import Card from "@/components/UI/Card.vue";

const props = defineProps<{ complectation: Complectation }>();

const { $api } = useNuxtApp();

const currentPowerUnit = ref(props.complectation.powerUnits[0]?.id);

const { data: optionCategories } = await useAsyncData(() => {
  return $api.get<OptionCategory[]>("option-categories");
});

const optionsForRender = computed<Array<OptionCategory>>(() => {
  const optCats: OptionCategory[] = [];

  Object.entries(props.complectation.optionsByCategories).forEach(
    ([catId, options]) => {
      const targetCat = optionCategories.value?.find(
        (optCat) => optCat.id == Number(catId),
      );

      optCats.push({ ...targetCat, options });
    },
  );
  return optCats;
});
</script>

<template>
  <div>
    <Card
      v-if="complectation.powerUnits.length"
      :title="$t('powerUnits')"
      class="mb-4"
    >
      <div class="flex flex-col lg:flex-row gap-4">
        <div
          class="flex lg:flex-col items-start gap-4 shrink-0 overflow-y-auto pb-2"
        >
          <div
            v-for="powerUnit in complectation.powerUnits"
            :key="powerUnit.id"
            class="w-50 lg:w-56 shrink-0 py-2 px-4 shadow-lg rounded-lg cursor-pointer transition-colors"
            :class="currentPowerUnit == powerUnit.id && 'text-white bg-primary'"
            @click="currentPowerUnit = powerUnit.id"
          >
            <strong class="basis-full">{{
              `${powerUnit.engine?.displayName} ${powerUnit.transmission?.drive}`
            }}</strong>
            <div class="basis-full">
              {{ powerUnit.transmission?.gearbox.numberOfGears }}
              {{
                $t(
                  `vehicle.transmission.gearbox.types.${powerUnit.transmission?.gearbox.type}`,
                )
              }}
            </div>
            <div>
              {{
                powerUnit.engine.power +
                " " +
                $t("units.power") +
                ", " +
                powerUnit.engine.torque +
                " " +
                $t("units.torque")
              }}
            </div>
            <b class="basis-full text-lg">${{ powerUnit.price }}</b>
          </div>
        </div>
        <PowerUnitInfo
          v-for="powerUnit in complectation.powerUnits"
          :key="powerUnit.id"
          v-show="powerUnit.id == currentPowerUnit"
          :power-unit="powerUnit"
        />
      </div>
    </Card>

    <Card :title="$t('complectationOptions')">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <OptionsList
          v-for="optCat in optionsForRender"
          :key="optCat.id"
          :option-category="optCat"
        />
      </div>
    </Card>
  </div>
</template>
