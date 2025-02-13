<script setup lang="ts">
import { Gallery, type IGalleryItem } from "@/components/UI/Gallery";
import ContactForm from "~/components/ContactForm.vue";
import { getPriceRange } from "../UI/CarCard/helpers";
import InfoBullet from "./InfoBullet.vue";
import type { AvailableCar } from "./interface";
import { getInfoBullets, getPowerUnitTitle } from "./helpers";

const props = defineProps<{ car: AvailableCar }>();

const open = defineModel<boolean>("open");

const priceRange = computed(() => getPriceRange(props.car?.complectations));
const powerUnitTitle = computed(() => {
  const powerUnit = props.car.complectations?.[0]?.powerUnits?.[0];

  if (!powerUnit) {
    return "";
  }

  return getPowerUnitTitle(powerUnit);
});

const img = useCdnImage();

const galleryItems = computed<IGalleryItem[]>(() => {
  if (!props.car) {
    return [];
  }

  return props.car.availability.images.map((image) => ({
    id: image.id,
    source: img(image.path, "large"),
  }));
});

const { t } = useI18n();

const infoBullets = computed(() =>
  getInfoBullets(
    {
      car: props.car,
      powerUnit: props.car.complectations?.[0]?.powerUnits?.[0],
    },
    t,
  ),
);
</script>

<template>
  <UModal v-model="open" :ui="{ width: 'lg:max-w-[75vw]' }">
    <UCard v-if="car">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6">
            {{ car.title }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="open = false"
          />
        </div>
      </template>

      <div class="flex flex-col lg:flex-row gap-4 sm:gap-8">
        <div class="basis-2/3 flex-shrink-0">
          <Gallery
            :items="galleryItems"
            :full-screen-available="false"
            :autoplay-interval="5_000"
          />
        </div>

        <div>
          <h2 class="text-xl sm:text-2xl">
            Новий <strong>{{ car.title }} {{ powerUnitTitle }}</strong> в
            наявності
          </h2>
          <div class="font-semibold italic text-xl">~ {{ priceRange }}</div>
          <div class="grid sm:grid-cols-2 gap-4 mt-8">
            <InfoBullet
              v-for="(infoBullet, i) in infoBullets"
              :key="i"
              :title="infoBullet.title"
              :value="infoBullet.value"
              :icon="infoBullet.icon"
              color="black"
            />
          </div>
          <div class="mt-8 flex">
            <div class="bg-slate-100 p-8 rounded-xl">
              <h3 class="font-bold text-xl mb-2">Роздрібна ціна</h3>

              <span class="font-bold text-4xl">
                UAH {{ car.availability.priceUah.toLocaleString() }}
              </span>
            </div>
          </div>
          <ContactForm
            id="available-car-contact-form"
            :page="`${car.title} ${powerUnitTitle} available car modal`"
            class="mt-8 mx-auto"
          />
        </div>
      </div>
    </UCard>
  </UModal>
</template>
