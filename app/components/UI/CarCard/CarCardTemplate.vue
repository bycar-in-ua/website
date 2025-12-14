<script setup lang="ts">
import type { Vehicle } from "@bycar-in-ua/sdk";
import { getCarTitle, getPriceRange } from "~/utils/carHelpers.js";
import { getVehicleInfoBullets } from "./helpers.js";
import SaveIcon from "./SaveIcon.vue";
import CompareIcon from "./CompareIcon.vue";

const props = defineProps<{
  car: Vehicle;
  title?: string;
  discount?: boolean;
  isSaved?: boolean;
  isCompared?: boolean;
  toggleSave?: (carId: number, title?: string) => Promise<void>;
  toggleCompare?: (carId: number, title?: string) => Promise<void>;
}>();

const { t } = useI18n();

const carTitle = computed(() => props.title ?? getCarTitle(props.car));
const priceRange = computed(() => getPriceRange(props.car.complectations));
const infoBullets = computed(() => getVehicleInfoBullets(props.car, t));
</script>

<template>
  <div
    class="relative flex flex-col group cursor-pointer border border-gray-200 border-b-0"
  >
    <div class="relative aspect-video overflow-hidden">
      <div>
        <CdnImage
          v-if="car.featureImage?.path"
          :src="car.featureImage.path"
          :alt="carTitle"
          size="small"
          :densities="['small:1x', 'medium:2x']"
          loading="lazy"
          class="object-cover h-full"
        />
        <img
          v-else
          src="/images/placeholder-image.jpg"
          class="object-cover h-full"
        />

        <div class="p-4 text-white absolute inset-0 flex flex-col z-10">
          <div class="flex items-start w-full">
            <slot name="badge" />

            <div class="flex-col gap-2 ml-auto hidden group-hover:flex">
              <UButton
                v-if="toggleSave"
                variant="outline"
                size="sm"
                class="rounded-full bg-white ring-gray-200 text-primary-900 p-2 hover:ring-primary-500 hover:bg-white hover:text-primary-500"
              >
                <SaveIcon
                  :is-saved
                  :car-id="car.id"
                  :title="carTitle"
                  :toggle-save="toggleSave"
                  class="shrink-0"
                />
              </UButton>

              <UButton
                v-if="toggleCompare"
                variant="outline"
                size="sm"
                class="rounded-full bg-white ring-gray-200 text-primary-900 p-2 hover:ring-primary-500 hover:bg-white hover:text-primary-500"
              >
                <CompareIcon
                  :is-compared
                  :car-id="car.id"
                  :title="carTitle"
                  :toggle-compare="toggleCompare"
                  class="shrink-0"
                />
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative flex flex-col p-4 z-30 bg-white">
      <div class="space-y-4.5">
        <slot name="header">
          <h3 class="text-lg font-bold">{{ carTitle }}</h3>
        </slot>

        <ul class="flex flex-wrap gap-1.5 text-gray-700 text-sm font-semibold">
          <li
            v-for="(bullet, index) in infoBullets"
            :key="index"
            class="px-1.5 py-1 border border-gray-100 font-semibold w-fit"
          >
            {{ bullet.text }}
          </li>
        </ul>

        <div class="space-x-2">
          <slot name="price">
            <span class="text-black text-lg font-bold">{{ priceRange }}</span>
          </slot>
        </div>
      </div>
    </div>

    <div
      class="absolute z-20 left-0 bottom-0 p-4 translate-y-0 group-hover:translate-y-[calc(100%-1rem)] transition-all duration-300 w-full outline outline-gray-200 bg-white"
    >
      <UButton
        class="opacity-0 group-hover:opacity-100 transition-all duration-900"
        block
      >
        Написати в чат
      </UButton>
    </div>
  </div>
</template>
