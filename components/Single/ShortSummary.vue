<script setup lang="ts">
import type { PowerUnit, Vehicle } from "@bycar-in-ua/sdk";
import { PowerUnitKey, type InfoBulletProps } from "./interface.js";
import InfoBullet from "./InfoBullet.vue";
import { getInfoBullets } from "./helpers.js";

const props = defineProps<{ car: Vehicle }>();

const activePowerUnit = inject(PowerUnitKey);

const { t } = useI18n();

const infoBullets = computed<InfoBulletProps[]>(() => getInfoBullets({ car: props.car, powerUnit: activePowerUnit?.powerUnit.value as PowerUnit }, t));
</script>

<template>
  <div class="p-6 flex justify-start gap-5">
    <InfoBullet
      v-for="(bullet, i) in infoBullets"
      :key="i"
      :title="bullet.title"
      :value="bullet.value"
      :icon="bullet.icon"
    />
  </div>
</template>
