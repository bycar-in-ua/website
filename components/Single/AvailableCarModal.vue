<script setup lang="ts">
import { Gallery, type IGalleryItem } from "@/components/UI/Gallery";
import ContactForm from "~/components/ContactForm.vue";
import { getPriceRange } from "../UI/CarCard/helpers";
import InfoBullet from "./InfoBullet.vue";
import type { AvailableCar } from "./interface";
import { getInfoBullets, getPowerUnitTitle } from "./helpers";

const props = defineProps<{ car: AvailableCar }>();

const open = defineModel<boolean>("open");

const priceRange = computed(() => getPriceRange([props.car.complectation!]));

const powerUnitTitle = computed(() => {
  const powerUnit = props.car.complectation?.powerUnits?.[0];

  if (!powerUnit) {
    return "";
  }

  return getPowerUnitTitle(powerUnit);
});

const img = useCdnImage();

const galleryItems = computed<IGalleryItem[]>(() => {
  if (!props.car?.images) {
    return [];
  }

  const images = [...props.car.images];

  return images
    .sort(
      (a, b) =>
        (a.order ?? Number.MAX_SAFE_INTEGER) -
        (b.order ?? Number.MAX_SAFE_INTEGER),
    )
    .map(({ imageId, image }) => ({
      id: imageId,
      source: img(image!.path, "large"),
    }));
});

const { t } = useI18n();

const infoBullets = computed(() =>
  getInfoBullets(
    {
      car: props.car,
      powerUnit: props.car.complectation?.powerUnits?.[0],
    },
    t,
  ),
);
</script>

<template>
  <UModal v-model="open" :ui="{ width: 'sm:max-w-[90vw] xl:max-w-[80vw]' }">
    <UCard
      v-if="car"
      :ui="{ body: { base: 'max-h-[85vh] sm:max-h-[80vh] overflow-y-auto' } }"
    >
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
            class="md:h-[500px] lg:h-[600px]"
          />
        </div>

        <div>
          <h2 class="text-lg lg:text-xl sm:text-2xl">
            Новий <strong>{{ car.title }} {{ powerUnitTitle }}</strong> в
            наявності
          </h2>
          <div class="font-semibold text-xl">~ {{ priceRange }}</div>
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

          <div v-if="car.dealer?.location" class="mt-8">
            В наявності в
            {{ car.dealer.location }}
          </div>

          <div class="mt-4 flex justify-center">
            <div class="bg-slate-100 p-6 sm:p-8 rounded-xl">
              <h3 class="font-bold text-xl mb-2">Роздрібна ціна</h3>

              <div class="font-bold text-xl md:text-2xl lg:text-4xl">
                UAH {{ car.price.toLocaleString() }}
              </div>

              <div class="text-xs mt-2 text-gray-600">
                <UIcon name="i-heroicons-information-circle" />
                Фактична ціна може відрізнятися від вказаної на сайті
              </div>
            </div>
          </div>

          <h4 class="text-center mt-8 font-semibold text-xl">
            Зв`язатися зі спеціалістом
          </h4>

          <ContactForm
            id="available-car-contact-form"
            :page="`${car.title} ${powerUnitTitle} available car modal`"
            class="mt-4 mx-auto"
          />
        </div>
      </div>
    </UCard>
  </UModal>
</template>
