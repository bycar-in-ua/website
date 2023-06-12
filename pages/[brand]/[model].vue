<template>
  <main class="bycar-container py-5 lg:py-10">
    <Title :title="carTitle" />
    <Media :images="car.images" />
    <GeneralInfo :description="car.description" :short-summary="shortSummary" />
    <FullInfo :car="car" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CarModelPage",
});
</script>

<script setup lang="ts">
import Title from "@/components/Single/Title.vue";
import Media from "@/components/Single/Media.vue";
import GeneralInfo from "@/components/Single/GeneralInfo.vue";
import FullInfo from "@/components/Single/FullInfo/index.vue";
import { getCarTitle } from "@/utils/carHelpers";
import { VehicleView as Car } from "@bycar-in-ua/common";
import { generatePageTitle } from "@/utils/seo";
import { type InfoLineProps } from "@/components/UI/InfoLine.vue";

const { $api, $cdnLink } = useNuxtApp();

const route = useRoute();

const { data: car } = await $api.get<Car>(`/vehicles/${route.params.model}`);

const carTitle = computed(() => getCarTitle(car));

useHead({
  title: generatePageTitle(carTitle.value),
  meta: [
    {
      name: "description",
      content: generatePageTitle(carTitle.value),
    },
    {
      name: "og:title",
      content: generatePageTitle(carTitle.value),
    },
    {
      name: "og:url",
      content: route.fullPath,
    },
    {
      name: "og:image",
      content: $cdnLink(car.featureImage?.path || car.images[0]?.path, 300),
    },
  ],
});

function getModelYear(car: Car) {
  let year = "";

  year += car.yearFrom;

  if (car.yearTo) {
    year += " - " + car.yearTo;
  }

  return year;
}

const shortSummary = computed<InfoLineProps[]>(() => [
  {
    name: "Модель",
    value: getCarTitle(car),
  },
  {
    name: "Модельний рік",
    value: getModelYear(car),
  },
  {
    name: "Тип кузова",
    value: car.bodyType,
  },
  {
    name: "Розмірний клас",
    value: String(car.sizeClass),
  },
]);

/**
 * @todo Сделать 404
 */
</script>
