<script setup lang="ts">
import SectionTitle from "@/components/UI/SectionTitle.vue";
import CarCard from "@/components/UI/CarCard/CarCard.vue";
import type { HomepageData } from "~/server/api/homepage-data.get";

defineProps<HomepageData["latestItems"]>();

const profileStore = useProfileStore();

const { toggleSave } = useSavedCarActions();
</script>

<template>
  <section class="my-10 md:my-24">
    <SectionTitle
      :title="title ?? 'Нові авто в каталозі'"
      :extra-link="`/catalog?${queryString}`"
    />

    <div
      class="cards-container grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-5"
    >
      <NuxtLink
        v-for="car in items"
        :key="car.id"
        :to="{
          name: 'SingleCar',
          params: {
            brand: car.brand?.slug ?? '',
            model: car.slug,
          },
        }"
        class="latest-car-card:nth-of-type-[n+7]:hidden lg:nth-of-type-[n+7]:block"
      >
        <CarCard
          :car="car"
          :toggle-save="toggleSave"
          :is-saved="profileStore.profile?.savedCars?.includes(car.id)"
        />
      </NuxtLink>
    </div>
  </section>
</template>
