<script setup lang="ts">
defineProps<{ totalCars?: number }>();
</script>

<template>
  <section
    class="flex flex-col sm:flex-row blured-ellipse-bg after:bottom-[10%] after:left-[25%] relative py-4 sm:py-12 md:py-24 lg:py-52"
  >
    <div class="md:basis-3/5 flex flex-col md:justify-center items-start z-10">
      <h1 class="text-3xl md:text-5xl font-semibold mb-4">
        Обрати нове
        <span
          class="relative inline-block before:block before:absolute before:-z-10 before:w-28 before:h-28 before:left-1/2 before:-translate-x-1/2 before:top-1/2 before:-translate-y-[45%] before:rounded-full before:bg-bycar-secondary-500"
        >
          авто
        </span>
        <br />
        - це просто
      </h1>
      <h2 class="text-sm md:text-base font-medium mb-6 sm:mb-8 md:mb-12">
        Від мрії до купівлі. Погнали зробимо це!
      </h2>

      <h3 v-if="totalCars && totalCars > 0" class="mb-2 hidden sm:block">
        {{ totalCars }} активних пропозицій
      </h3>

      <img
        src="/public/images/hero-image-mobile.png"
        class="mb-6 sm:hidden"
      />

      <UButton
        icon="i-heroicons-magnifying-glass"
        trailing
        :to="{ name: 'catalog' }"
        class="w-full sm:w-auto flex justify-center items-center"
      >
        Пошук авто
      </UButton>
      <h3
        v-if="totalCars && totalCars > 0"
        class="mt-2 text-center w-full sm:hidden"
      >
        {{ totalCars }} активних пропозицій
      </h3>
    </div>
    <div class="hidden sm:flex flex-grow mt-10 md:mt-0 flex-col justify-center">
      <div
        class="relative w-[160%] -right-1/3 sm:right-0 md:right-32 lg:right-52 bottom-14 sm:bottom-4 md:-bottom-16 lg:bottom-0 z-0 pt-[50%] sm:pt-0"
      >
        <img
          src="/public/images/hero-image.png"
          class="absolute inset-0 top-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  </section>
</template>
