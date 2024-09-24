<script setup lang="ts">
import type { VehicleView as Car } from "@bycar-in-ua/common";
import Title from "@/components/Single/Title.vue";
import Media from "@/components/Single/Media.vue";
import GeneralInfo from "@/components/Single/GeneralInfo.vue";
import FullInfo from "@/components/Single/FullInfo/index.vue";
import { getCarTitle } from "@/utils/carHelpers";
import { generatePageTitle } from "@/utils/seo";
import { type InfoLineProps } from "@/components/UI/InfoLine.vue";

definePageMeta({
  name: "SingleCar",
});

const { $cdnLink } = useNuxtApp();
const { t } = useI18n();

const route = useRoute();

const { data: car } = await useFetch(`/api/vehicles/${route.params.model}`, {
  default: () => ({} as Car),
});
console.log({ car: car.value });

const carTitle = computed(() => getCarTitle(car.value));

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
      content: $cdnLink(
        car.value.featureImage?.path || car.value.images[0]?.path,
        300,
      ),
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
    name: t("vehicle.model"),
    value: getCarTitle(car.value),
  },
  {
    name: t("vehicle.modelYear"),
    value: getModelYear(car.value),
  },
  {
    name: t("vehicle.bodyTypes.title"),
    value: car.value.bodyType,
  },
  {
    name: t("vehicle.sizeClases.title"),
    value: String(car.value.sizeClass),
  },
]);
</script>

<template>
  <main class="container pt-32 pb-5">
    <Title :title="carTitle" />
    <Media :images="car.images" />
    <GeneralInfo :description="car.description" :short-summary="shortSummary" />
    <FullInfo :car="car" />
  </main>
</template>
