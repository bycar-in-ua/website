<script setup lang="ts">
import SectionTitle from "./SectionTitle.vue";
import Control from "./Control.vue";
import type { PowerUnit } from "@bycar-in-ua/sdk";
import { getPowerUnitTitle, getPowerUnitSubtitle } from "./helpers";

defineProps<{ powerUnits: PowerUnit[];
  activePowerUnit?: PowerUnit;
  setActivePowerUnit: (p: PowerUnit) => void; }>();
</script>

<template>
  <section>
    <SectionTitle class="mb-4">
      Доступні силові агрегати
    </SectionTitle>

    <div class="flex gap-2 overflow-x-auto pb-1">
      <Control
        v-for="powerUnit in powerUnits"
        :key="powerUnit.id"
        :title="getPowerUnitTitle(powerUnit)"
        :subtitle="getPowerUnitSubtitle(powerUnit, $t)"
        :value="`$${powerUnit.price.toLocaleString()}`"
        :active="powerUnit.id === activePowerUnit?.id"
        @click="() => setActivePowerUnit(powerUnit)"
      />
    </div>
  </section>
</template>
