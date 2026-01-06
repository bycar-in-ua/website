<script setup lang="ts">
const config = useRuntimeConfig();
const partnershipFormUrl = config.public.partnershipFormUrl || "#";
</script>

<template>
  <section id="partnership-container" class="partnership-section py-24 px-20">
    <div class="flex flex-col gap-16">
      <h3 class="text-white text-5xl font-bold">
        Співпрацюємо по-чесному
      </h3>

      <div class="flex items-end justify-between">
        <p class="text-xl font-medium mt-auto text-gray-200">
          проста інтеграція, зрозумілі умови
        </p>

        <UButton
          :to="partnershipFormUrl"
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
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
