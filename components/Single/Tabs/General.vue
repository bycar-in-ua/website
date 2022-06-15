<template>
  <div class="py-4 grid gap-4 md:gap-6 xl:grid-cols-3 md:grid-cols-2">
    <Card title="Загальні характеристики">
      <info-line
        v-for="(item, index) in generalCaracteristics"
        :key="index"
        v-bind="item"
      />
    </Card>
    <Card title="Габаритні показники">Lorem ipsum </Card>
    <Card title="Маси та об'єми">Lorem ipsum </Card>
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

const generalCaracteristics: InfoLineProps[] = [
  {
    name: "Тип кузову",
    value: props.car.bodyType,
  },
  {
    name: "Клас авто",
    value: props.car.sizeClass,
  },
  {
    name: "Тип підсилювача керма",
    value: props.car.powerSteering,
  },
  {
    name: "Розположення двигуна",
    value: props.car.enginePlacement,
  },
  {
    name: "Кількість дверей",
    value: props.car.numberOfDoors,
  },
  {
    name: 'Діаметр дисків, "',
    value: props.car.discDiameter,
  },
  {
    name: "Результати краштестів",
    value: props.car.crashTestsRate,
  },
  {
    name: "Гарантія, років",
    value: props.car.warantyYears,
  },
  {
    name: "Гарантія на ЛФП, років",
    value: props.car.warantyYearsPaintwork,
  },
  {
    name: "Гарантія от наскрізної корозії, років",
    value: props.car.warantyYearsPaintwork,
  },
  {
    name: "Гарантія, пробіг - тис. км",
    value: props.car.warantyMileage,
  },
  {
    name: "Країна зборки",
    value: props.car.manufactureCountry,
  },
];
</script>
