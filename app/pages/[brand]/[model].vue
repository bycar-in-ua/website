<script setup lang="ts">
import type { PowerUnitView, TrimView } from "@bycar-in-ua/vehicles-sdk";
import type { AccordionItem } from "@nuxt/ui";
import { useAvailableVehicles } from "~/composables/useAvailableVehicles";
import { useSimilarVehicles } from "~/composables/useSimilarVehicles";
import VehicleGallery from "~/components/Single/VehicleGallery.vue";
import TrimsControls from "~/components/Single/TrimsControls.vue";
import SpecsBlock from "~/components/Single/SpecsBlock.vue";
import OptionsBlock from "~/components/Single/OptionsBlock.vue";
import SideWrap from "~/components/Single/SideWrap.vue";
import AvailableCars from "~/components/Single/AvailableCars.vue";
import ContactFormSection from "~/components/ContactFormSection.vue";
import { getCarTitle, getComplectationsSummary } from "~/utils/carHelpers";
import { generatePageTitle } from "~/utils/seo";

definePageMeta({ name: "SingleCar" });

const vehiclesService = useVehiclesService();

const route = useRoute();

const { data, error } = await useAsyncData(`${route.params.model}`, () =>
  vehiclesService.getVehicleBySlug(String(route.params.model)),
);

if (!data.value) {
  throw createError({
    statusCode: error.value?.status || 404,
    fatal: true,
  });
}

const { data: availableVehicles, suspense: availableSuspense } = useAvailableVehicles(data.value.id);
const { data: similarVehicles, suspense: similarSuspense } = useSimilarVehicles(data.value.id);

await Promise.allSettled([availableSuspense(), similarSuspense()]);

const car = computed(() => data.value!);

const galleryImages = computed(() => {
  const images = car.value.images ?? [];

  return images
    .map(({
      id, path, alt,
    }) => ({
      id,
      src: path,
      alt: alt || getCarTitle(car.value),
    }));
});

const activeTrim = ref<TrimView | undefined>(
  car.value.trims?.find((c) => c.base)
  || car.value.trims?.[0],
);
const activePowerUnit = ref<PowerUnitView | undefined>(
  activeTrim.value?.powerUnits?.[0],
);
const setActiveComplectation = (complectation: TrimView) => {
  activeTrim.value = complectation;
  activePowerUnit.value = complectation.powerUnits?.[0];
};
const setActivePowerUnit = (powerUnit: PowerUnitView) => {
  activePowerUnit.value = powerUnit;
};

const carTitle = getCarTitle(car.value);
const years = [car.value.yearFrom, car.value.yearTo]
  .filter(Boolean)
  .join(" - ");

const seoTitle
  = car.value.metaTitle
    ?? generatePageTitle([carTitle, years].filter(Boolean).join(" ").trim());
const complectations = getComplectationsSummary(car.value.trims);
const seoDescription
  = car.value.metaDescription
    ?? `${carTitle} ${years} - доступні комплектації та ціни, характеристики та фото. ${complectations}`;

const img = useCdnImage();

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogUrl: route.fullPath,
  ogImage: {
    type: "image/jpeg",
    url: img(
      car.value.featureImage?.path || car.value.images?.[0]?.path || "",
      "small",
    ),
    alt: carTitle,
  },
});

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(
        generateBreadcrumbsJsonLd([
          {
            name: seoTitle,
            path: route.fullPath,
          },
        ]),
      ),
    },
  ],
});

const accordionItems: AccordionItem[] = [
  {
    slot: "trims",
    label: "Модельний ряд",
  },
  {
    slot: "specs",
    label: "Характеристики",
  },
  {
    slot: "options",
    label: "Опції",
  },
  {
    slot: "description",
    label: "Опис",
  },
];

const { gtag } = useGtag();

gtag("event", "view_item", {
  screen_name: "single_car",
  items: [
    {
      item_id: car.value.id,
      item_name: carTitle,
      item_brand: car.value.brand?.displayName || "",
      item_category: "vehicle",
    },
  ],
});
</script>

<template>
  <main class="relative">
    <h1 class="sr-only">
      {{ car.h1 ?? carTitle }}
    </h1>

    <div class="container mx-auto relative grid grid-cols-3 gap-6 items-start">
      <div class="col-span-2">
        <VehicleGallery
          :images="galleryImages"
          :is-available-now="Boolean(availableVehicles?.meta.totalItems)"
          class="mb-6 md:mb-12"
        />

        <UAccordion
          :default-value="['0', '1']"
          :items="accordionItems"
          type="multiple"
          :ui="{
            label: 'text-3xl font-semibold',
            content: 'pb-6',
            trigger: 'py-6',
          }"
        >
          <template #trailing="{ open }">
            <UIcon :name="open ? 'i-lucide-minus' : 'i-lucide-plus'" class="ml-auto size-6" />
          </template>

          <template #trims>
            <TrimsControls
              :trims="car.trims"
              :active-trim="activeTrim"
              :set-active-trim="setActiveComplectation"
              :power-units="activeTrim?.powerUnits || []"
              :active-power-unit="activePowerUnit"
              :set-active-power-unit="setActivePowerUnit"
            />
          </template>

          <template #specs>
            <SpecsBlock :car="car" :trim="activeTrim" :power-unit="activePowerUnit" />
          </template>

          <template #options>
            <OptionsBlock :options="activeTrim?.options" />
          </template>

          <template #description>
            <!-- eslint-disable vue/no-v-html -->
            <div
              class="prose"
              v-html="car.description"
            />
          </template>
        </UAccordion>
      </div>

      <SideWrap
        class="sticky top-4"
        :car="car"
        :power-unit="activePowerUnit"
        :available-vehicles="availableVehicles?.items || []"
      />
    </div>

    <AvailableCars
      v-if="Boolean(availableVehicles?.meta.totalItems)"
      :car="car"
      :availability="availableVehicles?.items || []"
      class="container my-5"
    />

    <AvailableCars
      v-if="Boolean(similarVehicles?.length)"
      :car="car"
      :availability="similarVehicles || []"
      class="container my-5"
    />

    <ContactFormSection
      :page="carTitle"
      class="md:justify-between"
      :tg-link-message="`Вітаю! Цікавить авто ${carTitle}. Хочу дізнатись більше деталей`"
      :show-affix="false"
    />
  </main>
</template>
