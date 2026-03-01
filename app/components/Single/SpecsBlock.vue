<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import type { Complectation, PowerUnit, Vehicle } from "@bycar-in-ua/sdk";
import {
  getDimensionsBlock,
  getElectricEngineBlock,
  getGeneralInfoBlock,
  getPetrolEngineBlock,
  getTransmissionBlock,
  getWeightsAndVolumesBlock,
} from "./helpers";

const props = defineProps<{
  car: Vehicle;
  trim?: Complectation;
  powerUnit?: PowerUnit | null;
}>();

const { t } = useI18n();

type InfoLine = {
  title: string;
  value: string | number;
};

const data = computed<Record<string, InfoLine[]>>(() => ({
  general: getGeneralInfoBlock(props.car, t),
  engine: props.powerUnit?.engine
    ? props.powerUnit.engine.isElectric
      ? getElectricEngineBlock(props.powerUnit.engine, t)
      : getPetrolEngineBlock(props.powerUnit.engine, t)
    : [],
  transmission: props.powerUnit?.transmission
    ? getTransmissionBlock(props.powerUnit.transmission, t)
    : [],
  dimensions: getDimensionsBlock(props.car, t),
  weightsAndVolumes: getWeightsAndVolumesBlock(props.car, t),
}));

function getTabContent(tabValue?: string | number): InfoLine[] {
  if (!tabValue || !data.value[tabValue]) {
    return [];
  }

  return data.value[tabValue];
}

const tabsItems: TabsItem[] = [
  {
    label: "Загальні",
    value: "general",
  },
  {
    label: "Двигун",
    value: "engine",
  },
  {
    label: "Трансмісія",
    value: "transmission",
  },
  {
    label: "Габаритні показники",
    value: "dimensions",
  },
  {
    label: "Маси та об'єми",
    value: "weightsAndVolumes",
  },
];
</script>

<template>
  <UTabs
    :items="tabsItems"
    class="w-full"
    variant="pill"
    color="secondary"
    default-value="general"
    :ui="{ label: 'normal-case', content: 'divide-y divide-gray-100' }"
  >
    <template #content="{ item }">
      <div v-for="infoLine in getTabContent(item.value)" :key="infoLine.title" class="font-semibold flex gap-2 justify-between py-4">
        <span class="text-dimmed text-sm whitespace-nowrap uppercase">{{ infoLine.title }}</span> {{ infoLine.value }}
      </div>
    </template>
  </UTabs>
</template>
