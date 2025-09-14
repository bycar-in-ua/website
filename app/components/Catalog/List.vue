<script setup lang="ts">
import CarCard from "~/components/UI/CarCard/CarCard.vue";
import Pagination from "~/components/UI/Pagination.vue";
import { useCatalogStore } from "~/stores/catalog";
import { useProfileStore } from "#layers/profile/stores/profile";
import ContactFormSection from "../ContactFormSection.vue";

const catalogStore = useCatalogStore();
const profileStore = useProfileStore();

const { toggleSave } = useSavedCarActions();

const list = useTemplateRef<HTMLDivElement>("list");

const tgMessage = computed(() => {
  if (!catalogStore.appliedFilters.length && !catalogStore.data.items.length) {
    return "Вітаю! В каталозі немає жодного авто.";
  }

  const userFilters = catalogStore.appliedFilters
    .map((filter) => filter.label)
    .join(", ");

  return `Вітаю! Цікавить авто з параметрами: **${userFilters}**. Але в каталозі такого авто не знайдено.`;
});
</script>

<template>
  <div class="w-full relative">
    <UProgress
      v-if="catalogStore.pending"
      animation="carousel"
      class="absolute -top-4 left-0 right-0"
    />

    <template v-if="!catalogStore.data.items.length">
      <p class="text-center p-4 text-xl" v-text="$t('emptyCatalog')" />
      <ContactFormSection
        page="Каталог"
        class="md:justify-between"
        :tg-link-message="tgMessage"
      >
        <template #message>
          <h3 class="text-2xl font-bold mb-2">
            Не вдалось знайти бажане авто в каталозі?<br>
            Запитай у експерта!
          </h3>
          <p class="text-base text-gray-500 mb-4">
            Можливо, є додаткова інформація або ще не все оновлено в каталозі.
          </p>
        </template>
      </ContactFormSection>
    </template>
    <div
      ref="list"
      class="grid xs:grid-cols-2 sm:grid-cols-3 gap-5"
      :class="{ 'blur-sm': catalogStore.pending }"
    >
      <NuxtLink
        v-for="car in catalogStore.data.items"
        :key="car.id"
        :to="{
          name: 'SingleCar',
          params: {
            brand: car.brand?.slug ?? '',
            model: car.slug,
          },
        }"
      >
        <CarCard
          :car="car"
          :is-saved="profileStore.profile?.savedCars?.includes(car.id)"
          :toggle-save="toggleSave"
        />
      </NuxtLink>
    </div>
    <Pagination
      class="mt-10 flex justify-center"
      :page="catalogStore.pagination.page"
      :pagination="catalogStore.data.meta"
      @update:page="
        (page) => {
          catalogStore.pagination = { page };
          list?.scrollIntoView();
        }
      "
    />
  </div>
</template>
