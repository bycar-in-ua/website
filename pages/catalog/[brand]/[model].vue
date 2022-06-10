<template>
  <div class="bycar-container py-5 lg:py-10">
    <Title :title="getCarName(car)" />
    <Media :images="car.images" />
    <GeneralInfo :description="car.description" :short-summary="shortSummary" />
    <Tabs />
  </div>
</template>

<script lang="ts">
export default {
  name: "CarModelPage",
};
</script>

<script setup lang="ts">
import Title from "@/components/Single/Title.vue";
import Media from "@/components/Single/Media.vue";
import GeneralInfo from "@/components/Single/GeneralInfo.vue";
import Tabs from "@/components/Single/Tabs.vue";
import { Car } from "../../../types/car.type";
import { generatePageTitle } from "../../../utils/seo";
import { ShortSummary } from "../../../components/Single";

const { $api } = useNuxtApp();

const route = useRoute();

const { data: car } = await $api.get<Car>(`/vehicles/${route.params.model}`);

useHead({
  title: generatePageTitle(getCarName(car.value)),
});

function getCarName(car: Car) {
  return car.brand.displayName + " " + car.model;
}

function getModelYear(car: Car) {
  let year = "";

  year += car.yearFrom;

  if (car.yearTo) {
    year += " - " + car.yearTo;
  }

  return year;
}

const shortSummary = computed<ShortSummary[]>(() => [
  {
    name: "Модель",
    value: getCarName(car.value),
  },
  {
    name: "Модельний рік",
    value: getModelYear(car.value),
  },
  {
    name: "Тип кузову",
    value: car.value.bodyType,
  },
  {
    name: "Класс",
    value: car.value.sizeClass,
  },
]);

/**
 * @todo Сделать 404
 */
</script>
