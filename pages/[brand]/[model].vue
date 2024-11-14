<script setup lang="ts">
import type { Complectation, PowerUnit, Vehicle } from "@bycar-in-ua/sdk";
import Media from "@/components/Single/Media.vue";
import Complectations from "@/components/Single/Complectations.vue";
import PowerUnits from "@/components/Single/PowerUnits.vue";
import Colors from "@/components/Single/Colors.vue";
import FullInfo from "@/components/Single/FullInfo.vue";
import ContactForm from "@/components/ContactForm.vue";
import { getCarTitle } from "@/utils/carHelpers";
import { generatePageTitle } from "@/utils/seo";

definePageMeta({
  name: "SingleCar",
});

const { $cdnLink, $bycarApi } = useNuxtApp();

const route = useRoute();

const { data: car } = await useAsyncData(
  `${route.params.model}`,
  () => $bycarApi.getVehicleBySlug(route.params.model as string),
  {
    default: () => ({} as Vehicle),
  },
);

const activeComplectation = ref<Complectation | undefined>(car.value.complectations?.find((c) => c.base) || car.value.complectations?.[0]);
const activePowerUnit = ref<PowerUnit | undefined>(activeComplectation.value?.powerUnits?.[0]);
const setActiveComplectation = (complectation: Complectation) => {
  activeComplectation.value = complectation;
  activePowerUnit.value = complectation.powerUnits?.[0];
};
const setActivePowerUnit = (powerUnit: PowerUnit) => {
  activePowerUnit.value = powerUnit;
};

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
        car.value.featureImage?.path || car.value.images?.[0]?.path || "",
        300,
      ),
    },
  ],
});
</script>

<template>
  <main class="container pt-32 pb-5 relative blured-ellipse-bg after:left-0 after:top-40">
    <Media :car :title="carTitle" :active-power-unit="activePowerUnit" />

    <template v-if="car.complectations?.length">
      <Complectations :compectations="car.complectations" :active-complectation="activeComplectation" :set-active-complectation="setActiveComplectation" />
      <UDivider class="my-5" />
    </template>

    <template v-if="activeComplectation?.powerUnits?.length">
      <PowerUnits :power-units="activeComplectation.powerUnits ?? []" :active-power-unit="activePowerUnit" :set-active-power-unit="setActivePowerUnit" />
      <UDivider class="my-5" />
    </template>

    <template v-if="car.colors?.length">
      <Colors :colors="car.colors" />
      <UDivider class="my-5" />
    </template>

    <FullInfo :car :complectation="activeComplectation" :power-unit="activePowerUnit" />

    <!-- eslint-disable vue/no-v-html -->
    <section class="my-10" v-html="car.description">
    </section>

    <ContactForm />
  </main>
</template>
