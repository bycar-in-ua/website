<script setup lang="ts">
import { useElementVisibility } from "@vueuse/core";
import Quiz from "~/components/Quiz/Quiz.vue";

defineProps<{ totalCars?: number }>();

const { $setHeaderMode } = useNuxtApp();

const heroSection = useTemplateRef("heroSection");

if (import.meta.client) {
  const targetIsVisible = useElementVisibility(heroSection);

  watchEffect(() => {
    $setHeaderMode(targetIsVisible.value ? "dark" : "light");
  });

  onBeforeUnmount(() => {
    $setHeaderMode("light");
  });
}
</script>

<template>
  <section
    ref="heroSection"
    class="hero-section h-screen sm:h-auto max-h-[1000px] sm:max-h-screen pt-32 lg:pt-40 xl:pt-[12%] pb-[33%] text-white bg-cover bg-position-[right_-16rem_bottom] sm:bg-position-[center_bottom]"
  >
    <div class="container flex flex-col sm:flex-row gap-2 sm:justify-between">
      <h1
        class="text-4xl md:text-5xl lg:text-7xl font-semibold break-all sm:break-normal"
      >
        Мультибрендовий
        <br />
        онлайн автосалон
      </h1>

      <div class="max-w-lg sm:max-w-2xs">
        <h3 v-if="totalCars && totalCars > 0" class="mb-8 md:text-lg">
          Ми зібрали понад {{ totalCars }} нових авто, щоб ти не бігав салонами
        </h3>
        <Quiz>
          <template #trigger="{ open }">
            <UButton
              block
              icon="i-lucide-search"
              size="xl"
              color="secondary"
              @click="open"
            >
              Підібрати авто
            </UButton>
          </template>
        </Quiz>
      </div>
    </div>
  </section>
</template>

<style>
.hero-section {
  background-image: url("/images/hero-section-bg.jpg");
}
</style>
