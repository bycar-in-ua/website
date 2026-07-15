<script setup lang="ts">
import SectionTitle from "~/components/UI/SectionTitle.vue";
</script>

<template>
  <section class="container py-12 sm:py-16 md:py-20">
    <SectionTitle :title="['Наші партнери', 'Місця, де ми тестуємо авто']" class="mb-8 lg:mb-0" />

    <div class="sm:flex items-center gap-4 sm:gap-6 md:gap-8">
        <img src="/images/2g-logo.png" alt="Логотип 2G" class="w-full sm:w-64" />

        <div class="max-w-xl">
            <h3 class="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:sm-6">Трек 2G Circuit</h3>
            <p class="text-gray-600">Надають автодром для наших тестів. Завдяки ним, ми є єдині в країні, хто може собі дозволити справді тестувати авто, а не читати прес-реліз</p>
        </div>
    </div>
  </section>
</template>
