<script setup lang="ts">
import type { Complectation, PowerUnit, Vehicle } from "@bycar-in-ua/sdk";
import Media from "@/components/Single/Media.vue";
import Complectations from "@/components/Single/Complectations.vue";
import PowerUnits from "@/components/Single/PowerUnits.vue";
import FullInfo from "@/components/Single/FullInfo.vue";
import ContactForm from "@/components/ContactForm.vue";
import BluredEllipse from "@/components/UI/BluredEllipse.vue";
import { getCarTitle } from "@/utils/carHelpers";
import { generatePageTitle, generatePageDescription } from "@/utils/seo";

definePageMeta({
  name: "SingleCar",
});

const { $bycarApi } = useNuxtApp();

const route = useRoute();

const { data: car } = await useAsyncData(
  `${route.params.model}`,
  () => $bycarApi.getVehicleBySlug(route.params.model as string),
  {
    default: () => ({} as Vehicle),
  },
);

const activeComplectation = ref<Complectation | undefined>(
  car.value.complectations?.find((c) => c.base) ||
  car.value.complectations?.[0],
);
const activePowerUnit = ref<PowerUnit | undefined>(
  activeComplectation.value?.powerUnits?.[0],
);
const setActiveComplectation = (complectation: Complectation) => {
  activeComplectation.value = complectation;
  activePowerUnit.value = complectation.powerUnits?.[0];
};
const setActivePowerUnit = (powerUnit: PowerUnit) => {
  activePowerUnit.value = powerUnit;
};

const carTitle = computed(() => getCarTitle(car.value));

const img = useImage();

const seoTitle = generatePageTitle(
  [
    carTitle.value,
    [car.value.yearFrom, car.value.yearTo].filter(Boolean).join(" - "),
  ]
    .filter(Boolean)
    .join(" "),
);

useSeoMeta({
  title: seoTitle,
  description: generatePageDescription(seoTitle),
  ogTitle: seoTitle,
  ogUrl: route.fullPath,
  ogImage: img(
    car.value.featureImage?.path || car.value.images?.[0]?.path || "",
    { width: 300, height: 300 },
  ),
});
</script>

<template>
  <main class="container pt-24 md:pt-32 pb-5 relative">
    <BluredEllipse
      class="absolute w-[410px] h-[220px] left-0 md:left-40 top-40 -z-10"
    />
    <Media :car :title="carTitle" :active-power-unit="activePowerUnit" />

    <template v-if="car.complectations?.length">
      <Complectations
        :compectations="car.complectations"
        :active-complectation="activeComplectation"
        :set-active-complectation="setActiveComplectation"
      />
      <UDivider class="my-5" />
    </template>

    <template v-if="activeComplectation?.powerUnits?.length">
      <PowerUnits
        :power-units="activeComplectation.powerUnits ?? []"
        :active-power-unit="activePowerUnit"
        :set-active-power-unit="setActivePowerUnit"
      />
      <UDivider class="my-5" />
    </template>

    <FullInfo
      :car
      :complectation="activeComplectation"
      :power-unit="activePowerUnit"
    />

    <!-- eslint-disable vue/no-v-html -->
    <section
      class="my-6 md:my-10 mx-auto prose max-w-full"
      v-html="car.description"
    ></section>

    <ContactForm :page="carTitle">
      <template #ellipse>
        <BluredEllipse
          class="absolute w-[410px] h-[220px] right-0 md:right-24 top-32 md:-top-24 -z-10"
        />
      </template>
    </ContactForm>
  </main>
</template>
