<template>
  <div
    class="py-4 grid items-baseline gap-4 md:gap-6 xl:grid-cols-3 md:grid-cols-2"
  >
    <Card :title="$t('vehicle.generalCharacteristics.title')">
      <info-line
        v-for="(item, index) in generalCaracteristics"
        :key="index"
        v-bind="item"
      />
    </Card>
    <Card :title="$t('vehicle.generalCharacteristics.dimensions.title')"
      >Lorem ipsum
    </Card>
    <Card :title="$t('vehicle.generalCharacteristics.weightsNVolumes')"
      >Lorem ipsum
    </Card>
  </div>
</template>

<script lang="ts">
export default {
  name: "VehicleGeneralTab",
};
</script>

<script setup lang="ts">
import Card from "@/components/common/Card.vue";
import { InfoLine, InfoLineProps } from "@/components/common/InfoLine";
import { VehicleDto as Car } from "@/common";

const props = defineProps<{ car: Car }>();

const { $t } = useNuxtApp();

const generalCaracteristics: InfoLineProps[] = [
  {
    name: $t("vehicle.bodyTypes.title"),
    value: $t(`vehicle.bodyTypes.items.${props.car.bodyType}`),
  },
  {
    name: $t("vehicle.sizeClases.title"),
    value: $t(`vehicle.sizeClases.items.${props.car.sizeClass}`),
  },
  {
    name: $t("vehicle.powerSteerings.title"),
    value: $t(`vehicle.powerSteerings.items.${props.car.powerSteering}`),
  },
  {
    name: $t("vehicle.enginePlacements.title"),
    value: $t(`vehicle.enginePlacements.items.${props.car.enginePlacement}`),
  },
  {
    name: $t("vehicle.numberOfDoors"),
    value: props.car.numberOfDoors,
  },
  {
    name: $t("vehicle.discDiameter"),
    value: props.car.discDiameter,
  },
  {
    name: $t("vehicle.generalCharacteristics.crashTestsRate"),
    value: props.car.crashTestsRate,
  },
  {
    name: $t("vehicle.generalCharacteristics.warantyYears"),
    value: props.car.warantyYears,
  },
  {
    name: $t("vehicle.generalCharacteristics.warantyYearsPaintwork"),
    value: props.car.warantyYearsPaintwork,
  },
  {
    name: $t("vehicle.generalCharacteristics.warantyYearsPaintwork"),
    value: props.car.warantyYearsPaintwork,
  },
  {
    name: $t("vehicle.generalCharacteristics.warantyMileage"),
    value: props.car.warantyMileage,
  },
  {
    name: $t("vehicle.generalCharacteristics.manufactureCountry"),
    value: props.car.manufactureCountry,
  },
];
</script>
