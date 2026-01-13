<script setup lang="ts">
const config = useRuntimeConfig();
const partnershipFormUrl = config.public.partnershipFormUrl || "#";
</script>

<template>
  <section
    id="partnership-container"
    class="partnership-section pt-50 pb-12 px-4 sm:py-24 sm:px-20"
  >
    <div class="flex flex-col gap-3 md:gap-16">
      <h3 class="text-white text-5xl font-bold">
        Співпрацюємо по-чесному
      </h3>

      <div class="flex flex-col md:flex-row md:items-end justify-between">
        <p class="mt-auto mb-8 md:mb-0 text-xl font-medium text-gray-200">
          проста інтеграція, зрозумілі умови
        </p>

        <UButton
          :to="partnershipFormUrl"
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          class="justify-center"
        >
          Стати партнером
        </UButton>
      </div>
    </div>
  </section>
</template>

<style>
.partnership-section {
  background-image: url("/images/partnership-banner.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
</style>
