<script setup lang="ts">
import SectionTitle from "./SectionTitle.vue";
import Control from "./Control.vue";
import { ComplectationKey, PowerUnitKey } from "./interface";
import type { PowerUnit } from "@bycar-in-ua/sdk";
import { getPowerUnitTitle, getPowerUnitSubtitle } from "./helpers";

const activeComplectation = inject(ComplectationKey);
const activePowerUnit = inject(PowerUnitKey);

const powerUnits = computed(() => (activeComplectation?.complectation.value?.powerUnits ?? []) as PowerUnit[]);
</script>

<template>
  <section>
    <SectionTitle class="mb-4">
      Доступні силові агрегати
    </SectionTitle>

    <div class="flex gap-2">
      <Control
        v-for="powerUnit in powerUnits"
        :key="powerUnit.id"
        :title="getPowerUnitTitle(powerUnit)"
        :subtitle="getPowerUnitSubtitle(powerUnit, $t)"
        :value="`$${powerUnit.price}`"
        :active="powerUnit.id === activePowerUnit?.powerUnit.value?.id"
        @click="() => activePowerUnit?.setActivePowerUnit(powerUnit)"
      />
    </div>
  </section>
</template>
