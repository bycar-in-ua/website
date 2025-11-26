<script setup lang="ts">
import SectionTitle from "~/components/UI/SectionTitle.vue";
import CarCard from "~/components/UI/CarCard/CarCard.vue";
import type { HomepageData } from "#shared/types";
import { useProfileStore } from "#layers/profile/stores/profile";

const props = defineProps<{ latestItems: HomepageData["latestItems"]; }>();

const profileStore = useProfileStore();

const carousel = useTemplateRef("carousel");

const { toggleSave } = useSavedCarActions();

const carouselItems = computed(() => {
  if (props.latestItems.items.length === 0) {
    return [];
  }

  // Split items into chunks of 3 for carousel slides
  const chunkSize = 3;
  const chunks = [];

  for (let i = 0; i < props.latestItems.items.length; i += chunkSize) {
    chunks.push(props.latestItems.items.slice(i, i + chunkSize));
  }

  return chunks;
});
</script>

<template>
  <section class="my-10 md:my-20">
    <SectionTitle
      :title="['Авто в наявності', 'Спеціальні пропозиції']"
      :extra-link="`/catalog?${latestItems.queryString}`"
    >
      <template #extra>
        <div class="flex items-center gap-2">
          <UButton variant="outline">
            Дивитися всі
          </UButton>

          <UButton
            variant="outline"
            color="secondary"
            icon="i-lucide-chevron-left"
            class="ml-4"
            @click="carousel?.emblaApi?.scrollPrev()"
          />
          <UButton
            variant="outline"
            color="secondary"
            icon="i-lucide-chevron-right"
            @click="carousel?.emblaApi?.scrollNext()"
          />
        </div>
      </template>
    </SectionTitle>

    <UCarousel
      ref="carousel"
      v-slot="{ item }"
      dots
      loop
      :items="carouselItems"
    >
      <div class="grid grid-cols-3 gap-2">
        <CarCard
          v-for="car in item"
          :key="car.id"
          :car="car"
          :toggle-save="toggleSave"
          :is-saved="profileStore.profile?.savedCars?.includes(car.id)"
        />
      </div>
    </UCarousel>
  </section>
</template>
