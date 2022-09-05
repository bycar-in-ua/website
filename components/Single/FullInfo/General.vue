<template>
  <h3
    id="general"
    class="text-2xl font-bold text-center"
    v-text="$t('vehicle.generalCharacteristics.title')"
  />

  <div
    class="py-4 grid items-baseline gap-4 md:gap-6 xl:grid-cols-3 md:grid-cols-2"
  >
    <Card
      :title="$t('vehicle.generalCharacteristics.title')"
      class="row-span-2"
    >
      <info-line
        v-for="(item, index) in generalCaracteristics"
        :key="index"
        v-bind="item"
      />
    </Card>
    <Card :title="$t('vehicle.generalCharacteristics.dimensions.title')">
      <info-line v-for="(item, index) in gabarits" :key="index" v-bind="item" />
    </Card>
    <Card :title="$t('vehicle.generalCharacteristics.weightsNVolumes')">
      <info-line v-for="(item, index) in volumes" :key="index" v-bind="item" />
    </Card>
    <Card v-if="car.colors.length" :title="$t('colors.availableColors')">
      <div class="grid gap-4 colors-wrapper">
        <img
          v-for="color in car.colors"
          :key="color.id"
          :src="$cdnLink(color.reference, 200, 200)"
          :alt="color.name"
          :title="color.name"
          class="w-16 rounded-full"
        />
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
export default {
  name: "VehicleGeneralTab",
};
</script>

<script setup lang="ts">
import Card from "@/components/UI/Card.vue";
import InfoLine, { type InfoLineProps } from "@/components/UI/InfoLine.vue";
import { VehicleDto as Car } from "@/common";

const props = defineProps<{ car: Car }>();

const { $t, $cdnLink } = useNuxtApp();

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
    name: $t("vehicle.generalCharacteristics.numberOfSeats"),
    value: props.car.numberOfSeats,
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

const gabarits: InfoLineProps[] = [
  {
    name: $t("vehicle.generalCharacteristics.dimensions.l"),
    value: props.car.dimensionL,
  },
  {
    name: $t("vehicle.generalCharacteristics.dimensions.w"),
    value: props.car.dimensionW,
  },
  {
    name: $t("vehicle.generalCharacteristics.dimensions.h"),
    value: props.car.dimensionH,
  },
  {
    name: $t("vehicle.generalCharacteristics.wheelbase"),
    value: props.car.wheelbase,
  },
  {
    name: $t("vehicle.generalCharacteristics.clearance"),
    value: props.car.clearance,
  },
];

const volumes: InfoLineProps[] = [
  {
    name: $t("vehicle.generalCharacteristics.curbWeight"),
    value: props.car.curbWeight,
  },
  {
    name: $t("vehicle.generalCharacteristics.fullWeight"),
    value: props.car.fullWeight,
  },
  {
    name: $t("vehicle.generalCharacteristics.gasTankVolume"),
    value: props.car.gasTankVolume,
  },
  {
    name: $t("vehicle.generalCharacteristics.trunkVolume"),
    value: props.car.trunkVolume,
  },
];
</script>

<style>
.colors-wrapper {
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
}
</style>
