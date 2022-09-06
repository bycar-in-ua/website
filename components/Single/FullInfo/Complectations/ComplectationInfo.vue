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
            @click="currentPowerUnit = powerUnit.id"
            class="w-50 lg:w-56 shrink-0 py-2 px-4 shadow-lg rounded-lg cursor-pointer transition-colors"
            :class="currentPowerUnit == powerUnit.id && 'text-white bg-primary'"
          >
            <strong class="basis-full">{{
              powerUnit.engine.displayName + " " + powerUnit.transmission.drive
            }}</strong>
            <div class="basis-full">
              {{ powerUnit.transmission.gearbox.numberOfGears }}
              {{
                $t(
                  `vehicle.transmission.gearbox.types.${powerUnit.transmission.gearbox.type}`,
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
      <div class="flex flex-wrap gap-8">
        <div v-for="optCat in optionsForRender" :key="optCat.id" class="mb-4">
          <h4>{{ optCat.displayName }}:</h4>

          <p v-for="option in optCat.options" :key="option.id">
            {{ option.displayName }}
          </p>
        </div>
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ComplectationInfo",
});
</script>

<script setup lang="ts">
import {
  ComplectationView as Complectation,
  OptionCategoryDto as OptionCategory,
} from "@/common/dto";
import Card from "@/components/UI/Card.vue";
import PowerUnitInfo from "./PowerUnitInfo.vue";

const props = defineProps<{ complectation: Complectation }>();

const { $t, $api } = useNuxtApp();

const currentPowerUnit = ref(props.complectation.powerUnits[0]?.id);

const { data: optionCategories } = await $api.get<OptionCategory[]>(
  "option-categories",
);

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