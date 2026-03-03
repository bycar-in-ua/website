<script setup lang="ts">
import type { VehicleSearchDocument } from "@bycar-in-ua/vehicles-sdk";
import VehiclesCarousel from "~/components/VehiclesCarousel.vue";
import SectionTitle from "~/components/UI/SectionTitle.vue";

defineProps<{
  vehicles: VehicleSearchDocument[];
  title: string[];
}>();

const carousel = useTemplateRef("carousel");
</script>

<template>
  <section>
    <SectionTitle
      :title
      class="mb-10"
    >
      <template #extra>
        <div class="flex items-center gap-2">
          <!-- <UButton variant="outline">
            Дивитися всі
          </UButton> -->

          <UButton
            variant="outline"
            color="secondary"
            icon="i-lucide-chevron-left"
            class="ml-4"
            @click="carousel?.scrollPrev()"
          />
          <UButton
            variant="outline"
            color="secondary"
            icon="i-lucide-chevron-right"
            @click="carousel?.scrollNext()"
          />
        </div>
      </template>
    </SectionTitle>

    <VehiclesCarousel
      ref="carousel"
      :vehicles
    />
  </section>
</template>
