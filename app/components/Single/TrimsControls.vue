<script setup lang="ts">
import type { Complectation, PowerUnit } from "@bycar-in-ua/sdk";
import Control from "./Control.vue";
import { getPowerUnitTitle, getPowerUnitSubtitle } from "~/components/Single/helpers";

type TrimsControlsProps = {
  trims: Complectation[];
  activeTrim?: Complectation;
  setActiveTrim: (c: Complectation) => void;
  powerUnits: PowerUnit[];
  activePowerUnit?: PowerUnit;
  setActivePowerUnit: (p: PowerUnit) => void;
};

defineProps<TrimsControlsProps>();
</script>

<template>
  <h3 class="mb-3 text-lg font-semibold text-gray-900">
    Комплектації
  </h3>

  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
    <Control
      v-for="trim in trims"
      :key="trim.id"
      :title="trim.displayName"
      :active="trim.id === activeTrim?.id"
      @click="() => setActiveTrim(trim)"
    />
  </div>

  <h3 class="mt-8 mb-3 text-lg font-semibold text-gray-900">
    Силові агрегати
  </h3>

  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
    <Control
      v-for="powerUnit in powerUnits"
      :key="powerUnit.id"
      :title="getPowerUnitTitle(powerUnit)"
      :subtitle="getPowerUnitSubtitle(powerUnit, $t)"
      :active="powerUnit.id === activePowerUnit?.id"
      @click="() => setActivePowerUnit(powerUnit)"
    />
  </div>
</template>
